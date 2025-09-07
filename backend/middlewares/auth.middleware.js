const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklist.token');
const captainModel = require('../models/driver.model');

// Helper function to safely extract the token from cookies or headers
const extractToken = (req) => {
    let token = req.cookies.token;

    // If no cookie, check the Authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        // Extracts the token part from "Bearer <token>"
        token = req.headers.authorization.split(' ')[1];
    }
    return token;
};

module.exports.authUser = async (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const isBlacklisted = await blackListTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token has been invalidated' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        // This will now return a specific error message (e.g., "jwt expired")
        return res.status(401).json({ message: `Unauthorized: ${err.message}` });
    }
};

module.exports.authCaptain = async (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const isBlacklisted = await blackListTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token has been invalidated' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized: Captain not found' });
        }
        
        req.captain = captain;
        next();
    } catch (err) {
        // This provides a more descriptive error
        return res.status(401).json({ message: `Unauthorized: ${err.message}` });
    }
};