const mongoose = require('mongoose');

const Schema = mongoose.Schema


const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    arrival: Date,
});


const flightSchema = new Schema ({
    airline: {
        type: String,
        required: true,
        enum: ['American', 'Southwest', 'United'],
    },
    departureAirport: {
        type: String,
        default: "DEN",
        enum: ['AUS' , 'DFW', 'DEN', 'LAX', 'SAN'],
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
        default: function() {
            let now = new Date()
            now.setFullYear(now.getFullYear()+1);
            return now;
          }
    },
    arrival: {
        type: Date,
        default: function() {
            let now = new Date()
            now.setFullYear(now.getFullYear()+1);
            return now;
          }
    },
    arrivalAirport: {
        type: String,
        default: "DEN",
        enum: ['AUS' , 'DFW', 'DEN', 'LAX', 'SAN'],
    },
    destinations : {
        type: [destinationSchema],
    }
});




module.exports = mongoose.model('Flight', flightSchema);