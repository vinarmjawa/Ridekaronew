const dotenv = require('dotenv');

dotenv.config(); 
const express = require('express');
const app = express();
const connectToDb =require('./db')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const userroutes = require('./routes/user.routes');
const rideroutes = require('./routes/ride.routes');
const captainroutes = require('./routes/driver.routes')
connectToDb();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());


app.use('/rides', rideroutes);
app.use('/captains',captainroutes);
app.use('/users',userroutes);

app.get('/',(req,res)=>{
    res.send('hello world');
});
module.exports =app;
