const dotenv = require('dotenv');
dotenv.config(); 
const express = require('express');
const app = express();
const connectToDb =require('./db')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const userroutes = require('./routes/user.routes');
const rideroutes = require('./routes/ride.routes');
const captainroutes = require('./routes/driver.routes');
const maproutes = require('./routes/map.routes');
const quickride = require('./routes/quickride')
connectToDb();
app.use(cors({
  origin: 'https://ridekaronew.vercel.app'|| true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());


app.use('/rides', rideroutes);
app.use('/captains',captainroutes);
app.use('/users',userroutes);
app.use('/maps',maproutes);
app.use('/quickride',quickride);
app.get('/',(req,res)=>{
    res.send('hello world');
});
module.exports =app;
