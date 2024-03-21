// routes/index.js
const express = require('express');
const router = express.Router();
const Bet = require('../models/bet');

// GET home page
router.get('/', async (req, res, next) => {
    try {
        const bets = await Bet.find().sort({ datePlaced: -1 }).limit(5);
        res.render('index', { bets });
      } catch (error) {
        next(error);
      }
});

module.exports = router;
