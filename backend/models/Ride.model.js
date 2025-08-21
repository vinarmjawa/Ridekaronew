// models/Ride.model.js
const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain', // This links to your existing captainModel
        required: true
    },
    startLocation: {
        type: String,
        required: true
    },
    endLocation: {
        type: String,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true,
        min: 0
    },
    pricePerSeat: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
        default: 'SCHEDULED'
    }
}, { timestamps: true });

const RideModel = mongoose.model('Ride', rideSchema);
module.exports = RideModel;