const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainSchema = new mongoose.Schema({
    fullname:{
      firstname:{
        type: String,
        required: true,
        minlength:[3,'firstname must be 3 char']
      },
      lastname:{
         type: String,
        minlength:[3,'firstname must be 3 char']
      }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase : true,
        // CORRECTED: Valid email regex
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'please enter valid email']
    },
    password:{
      type: String,
      required:true,
      select:false
    },
    socketId:{
      type: String,
    },
    status:{
      type: String,
      enum: ['active','inactive'],
      default: 'inactive',
    },
    vehicle:{
       color:{
        type: String,
        minlength:[3,'car color must be 3 char']
       },
       plate:{
        type: String,
        required: true,
        minlength :[4,'plate no']
       },
       capacity:{
        type: Number,
        required: true,
        min :[1,'should be atleast one'],
       },
       vehicleType:{
         type: String,
         required: true,
         enum: ['car','motorbike','auto']
       },
       
    },
    location:{
        lng:{
          type:Number
        },
        ltd:{
          type: Number
        }
       },

})
captainSchema.methods.generateAuthToken = function (){
const token = jwt.sign({
  _id: this._id
},process.env.JWT_SECRET,{expiresIn:'24h'})
return token;}
captainSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password,this.password);

}
captainSchema.statics.hashPassword = async function (password){
 return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('captain',captainSchema)

module.exports = captainModel;