const Flight = require('../models/flights')
const Ticket = require('../models/ticket');

module.exports = {
  index,
  new: newflight,
  create,
  show,
  addDestination,
}


async function create (req, res) {
  try {
    await Flight.create(req.body);
    res.redirect('/flights');
  } catch (err) {
    console.log(err)
    res.redirect('/flights/new');
  }
}


async function index(req, res) {
  const flights = await Flight.find({});
  res.render('flights/index', { title: 'ALL FLIGHTS', flights: flights });
}

function newflight(req,res) {
  res.render('flights/new', {
    title: "Add Flight",
    errorMsg: ''
  })
}

async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    const tickets = await Ticket.find({flight: flight._id});
    if (!flight) {
      return res.status(404).send('Flight not found');
    }
    res.render('flights/show', { title: 'Flight Details', flight, tickets });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving flight details');
  }
}


async function addDestination(req, res) {
  try {
      const flight = await Flight.findById(req.params.id);
      if (!flight) {
          return res.status(404).send('Flight not found');
      }
      flight.destinations.push({
        airport: req.body.airport,
        arrival: req.body.arrival,
      });
      await flight.save();
      res.redirect(`/flights/${flight._id}`);
  } catch (err) {
      console.log(err);
      res.status(500).send('Error adding destination');
  }
}


