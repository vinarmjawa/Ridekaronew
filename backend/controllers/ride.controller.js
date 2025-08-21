// backend/controllers/ride.controller.js
const rideService = require('../services/ride.service');
const bookingService = require('../services/booking.service');

exports.publishRide = async (req, res) => {
    
    try {
        // Add a more specific check for the captain's ID
        if (!req.captain || !req.captain._id) {
       
            return res.status(401).json({ message: "Unauthorized: Captain not properly authenticated." });
        }

        const { startLocation, endLocation, departureTime, availableSeats, pricePerSeat } = req.body;
        
        const rideData = {
            driver: req.captain._id,
            startLocation,
            endLocation,
            departureTime,
            availableSeats,
            pricePerSeat
        };

        const ride = await rideService.publishRide(rideData);
        res.status(201).json({ message: "Ride published successfully!", ride });

    } catch (error) {
        console.error("Error occurred in publishRide controller:", error);
        res.status(500).json({ message: "Server error while publishing ride.", error: error.message });
    }
};

// ... (the rest of your controller functions remain the same)
exports.searchRides = async (req, res) => {
    try {
        const { from, to } = req.query;
        if (!from || !to) {
            return res.status(400).json({ message: "Start and end locations are required for search." });
        }
        const rides = await rideService.searchRides(from, to);
        res.status(200).json(rides);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.bookRide = async (req, res) => {
    try {
        const { rideId, seats } = req.body;
        const passengerId = req.user._id;

        const ride = await rideService.findRideById(rideId);
        if (!ride) {
            return res.status(404).json({ message: "Ride not found." });
        }
        if (ride.availableSeats < seats) {
            return res.status(400).json({ message: "Not enough seats available." });
        }

        const booking = await bookingService.createBooking({
            ride: rideId,
            passenger: passengerId,
            seatsBooked: seats
        });

        await rideService.updateRideSeats(rideId, seats);

        res.status(200).json({ message: "Ride booked successfully!", booking });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.getMyRides = async (req, res) => {
    try {
        const captainId = req.captain._id;

        
        const rides = await rideService.findRidesByDriver(captainId);

    
        const ridesWithBookings = await Promise.all(
            rides.map(async (ride) => {
                const bookings = await bookingService.findBookingsForRide(ride._id);
                return {
                    ...ride.toObject(),
                    bookings: bookings,
                };
            })
        );

        res.status(200).json(ridesWithBookings);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.getBookedRides = async (req, res) => {
    try {
        const passengerId = req.user._id;
        const bookings = await bookingService.findBookingsByPassenger(passengerId);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};