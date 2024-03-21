const mongoose = require('mongoose');

const Schema = mongoose.Schema

const commentsSchema = new Schema({
  content: {
      type: String,
      require: true
  },
}, {
  timestamps: true
});

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
  comments: [commentsSchema]
}, {
  timestamps: true
});

const Bet = mongoose.model('Bet', betSchema);

module.exports = Bet;
