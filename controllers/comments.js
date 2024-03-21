const Bet = require('../models/bet');

module.exports = {
  create,
};

async function create(req, res) {
  try {
    const bet = await Bet.findById(req.params.id);

    if (!bet) {
      return res.status(404).send('Bet not found');
    }

    bet.comments.push(req.body);

    await bet.save();

    res.redirect(`/bets`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error saving comment');
  }
}