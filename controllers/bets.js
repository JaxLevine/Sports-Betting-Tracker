const Bet = require("../models/bet");
const moment = require('moment-timezone');

const newBet = function(req, res) {
  res.render("bets/new", { title: "Add New Bet" });
};

const create = async function(req, res) {
  try {
    const { odds, result, datePlaced } = req.body;
    let profitLoss = 0;
    const isUnderdog = odds > 0;
    let risk = 0;
    if (isUnderdog) {
      risk = 100;
      profitLoss = result === 'Win' ? odds : -risk;
    } else {
      risk = Math.round((Math.abs(odds) / 100) * 100);
      profitLoss = result === 'Win' ? 100 : -risk;
    }
    if (req.body.betType !== 'Prop') {
      delete req.body.propDetails;
    }
    const adjustedDatePlaced = moment.tz(datePlaced, 'YYYY-MM-DD', 'America/New_York').set({hour: 12}).toDate();
    await Bet.create({ ...req.body, profitLoss, datePlaced: adjustedDatePlaced });
    res.redirect('/bets');
  } catch (error) {
    console.error("Creation error:", error);
    res.render('bets/new', {
      title: 'Add New Bet',
      errors: error.errors,
      data: req.body,
    });
  }
};

const list = async function(req, res) {
  try {
    const bets = await Bet.find({}).sort({ datePlaced: -1 });
    const groupedBets = {};
    let initialWins = 0;
    let initialLosses = 0;
    let dynamicWins = 0;
    let dynamicLosses = 0;

    bets.forEach(function(bet) {
      const date = moment(bet.datePlaced).tz('America/New_York').format('dddd, MMMM D, YYYY');
      if (!groupedBets[date]) {
        groupedBets[date] = [];
      }
      groupedBets[date].push(bet);

      if (bet.result === 'Win') {
        dynamicWins++;
      } else if (bet.result === 'Loss') {
        dynamicLosses++;
      }
    });

    let totalWins = initialWins + dynamicWins;
    let totalLosses = initialLosses + dynamicLosses;
    const totalProfit = bets.reduce(function(sum, bet) {
      return sum + bet.profitLoss;
    }, 0);
    const totalGames = dynamicWins + dynamicLosses;
    let winPercentage = totalGames > 0 ? (totalWins / (totalWins + totalLosses) * 100).toFixed(2) : ((initialWins / (initialWins + initialLosses)) * 100).toFixed(2);

    res.render('bets/index', { title: 'All Bets', groupedBets, totalProfit, wins: totalWins, losses: totalLosses, winPercentage });
  } catch (error) {
    console.error("List error:", error);
    res.status(500).send('Error fetching bets');
  }
};

const deleteBet = async function(req, res) {
  try {
    const betId = req.params.id;
    await Bet.findByIdAndDelete(betId);
    res.redirect("/bets");
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).send("Error deleting bet");
  }
};

module.exports = {
  new: newBet,
  create: create,
  list: list,
  delete: deleteBet,
};