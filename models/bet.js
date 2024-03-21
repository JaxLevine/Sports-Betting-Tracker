const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  league: {
    type: String,
    required: true,
    enum: ['NBA'] 
  },
  team: {
    type: String,
    required: true
  },
  player: {
    type: String,
    required: true
  },
  odds: {
    type: Number,
    required: true
  },
  betType: {
    type: String,
    required: true,
    enum: ['Moneyline', 'Spread', 'Total', 'Prop'] 
  },
  propDetails: {
    type: String,
    required: function() {return this.betType === 'Prop';}
  },
  result: {
    type: String,
    required: true,
    enum: ['Win', 'Loss']
  },
  datePlaced: {
    type: Date,
    default: Date,
  },
  profitLoss: { 
    type: Number, 
    default: 0 
  },
});

const Bet = mongoose.model('Bet', betSchema);

module.exports = Bet;
