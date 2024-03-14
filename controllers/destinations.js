const Flight = require('../models/flight');

module.exports = {
  create,
};

async function create(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).send('Destination not found');
    }
    flight.destinations.push(req.body);
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error saving review');
  }
}
