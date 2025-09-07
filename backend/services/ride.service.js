
const Ride = require('../models/ride.model');
module.exports.publishRide = async (rideData) => {
   
    try {
        const ride = await Ride.create(rideData);
       
        return ride;
    } catch (error) {
        
        throw error;
    }
};

module.exports.searchRides = async (from, to) => {
    // ... (rest of the file is unchanged)
    const rides = await Ride.find({
        startLocation: { $regex: new RegExp(from, 'i') },
        endLocation: { $regex: new RegExp(to, 'i') },
        availableSeats: { $gt: 0 },
        departureTime: { $gt: new Date() }
    }).populate('driver', 'fullname');
    return rides;
};

module.exports.findRideById = async (rideId) => {
    return await Ride.findById(rideId);
};

module.exports.updateRideSeats = async (rideId, seatsToBook) => {
    // Use $inc to safely decrement the seat count
    return await Ride.findByIdAndUpdate(rideId, { $inc: { availableSeats: -seatsToBook } }, { new: true });
};
module.exports.findRidesByDriver = async (driverId) => {
    // Find all rides by the driver, sort them by departure time
    return await Ride.find({ driver: driverId }).sort({ departureTime: -1 });
};