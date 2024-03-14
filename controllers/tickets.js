const Ticket = require("../models/ticket");
const Flight = require("../models/flights");

module.exports = {
  new: newTicket,
  create,
};

function newTicket(req, res) {
  res.render("tickets/new", { title: "New Ticket", flightId: req.params.id });
}

async function create(req, res) {
  req.body.flight = req.params.id;
  try {
    await Ticket.create(req.body);
    res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/flights/${req.params.id}/tickets/new`);
  }
}
