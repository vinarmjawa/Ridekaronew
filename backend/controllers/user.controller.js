const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');
const blacklisttokenModel = require('../models/blacklist.token')
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword
  });

  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};
module.exports.loginUser = async (req,res,next)=>{
const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

  }
  const {  email, password } = req.body;
  const user = await userModel.findOne({email}).select('+password');
  if(!user){
   return res.status(401).json({message:'invalid email or password'});
  }
  const match = await user.comparePassword(password);
  if(!match){
     return res.status(401).json({message:'invalid email or password'});
  }
  const token = user.generateAuthToken();
  res.cookie('token' ,token)
  res.status(200).json({token,user});
};
module.exports.getuserprofile= async(req,res,next)=>{
res.status(200).json(req.user);
};
module.exports.logoutuser = async (req,res,next)=>{
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  await blacklisttokenModel.create({token});
  res.status(200).json({message:'logged out'});
}