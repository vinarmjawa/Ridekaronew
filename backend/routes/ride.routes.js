const express = require('express');
const router = express.Router();

// Import the correct controller and middleware
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get(
    '/my-booked-rides',
    authMiddleware.authUser, // Protected by user authentication
    rideController.getBookedRides
);

router.post(
    '/publish',
    authMiddleware.authCaptain, // Protected by your captain middleware
    rideController.publishRide
);

router.get(
    '/my-rides',
    authMiddleware.authCaptain, // Protect this route
    rideController.getMyRides
);
router.get(
    '/search',
    authMiddleware.authUser, 
    rideController.searchRides
);


router.post(
    '/book',
    authMiddleware.authUser, 
    rideController.bookRide
);

module.exports = router;