const express = require('express');
const router = express.Router();
const {body} = require("express-validator")
const userController = require('../controllers/user.controller');
const authmiddleware = require('../middlewares/auth.middleware');

router.post('/login',[body('email').isEmail().withMessage('Invalid email'),
       body('password').isLength({min:8}).withMessage('password should be atleast 8 letters '),
    userController.loginUser
    ])
router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name should be atleast 3 letters '),
    body('password').isLength({min:8}).withMessage('password should be atleast 8 letters '),
    userController.registerUser
])
router.get('/profile',authmiddleware.authUser,userController.getuserprofile);
router.get('/logout',authmiddleware.authUser,userController.logoutuser);
module.exports = router;
