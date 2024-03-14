const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');

// Flight creation and listing
router.post('/', flightsCtrl.create);
router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);

// Flight detail view
router.get('/:id', flightsCtrl.show);

module.exports = router;
