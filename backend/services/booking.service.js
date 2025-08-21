// backend/services/booking.service.js
const Booking = require('../models/booking.model');

module.exports.createBooking = async (bookingData) => {
    const booking = await Booking.create(bookingData);
    return booking;
};

// CORRECTED FUNCTION
module.exports.findBookingsByPassenger = async (passengerId) => {
    return await Booking.find({ passenger: passengerId })
        .populate({
            path: 'ride',
            populate: {
                path: 'driver', // This will now correctly use the 'captain' ref from your Ride schema
                select: 'fullname vehicle'
            }
        })
        .sort({ createdAt: -1 });
};

module.exports.findBookingsForRide = async (rideId) => {
    return await Booking.find({ ride: rideId }).populate({
        path: 'passenger',
        select: 'fullname'
    });
};