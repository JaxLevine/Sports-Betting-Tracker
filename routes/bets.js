const express = require('express');
const router = express.Router();
const betsController = require('../controllers/bets');

router.get('/new', betsController.new);
router.post('/', betsController.create);
router.get('/', betsController.list);
router.delete('/:id', betsController.delete);


module.exports = router;
