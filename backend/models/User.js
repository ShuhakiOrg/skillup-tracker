const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {type:String,unique:true,required:true},
  email: {type:String,unique:true,required:true},
  password: {type:String,required:true},
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  bio: { type: String, default: '' },
  badges: [{ type: String }],
  isPublicProfile: { type: Boolean, default: false },
  profileImage: { type: String, default: '' },
  joinDate: { type: Date, default: Date.now },
  totalModulesCompleted: { type: Number, default: 0 },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  refreshToken: { type: String}
});

userSchema.methods.generateAuthToken=function ()
{
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
}

userSchema.methods.generateRefreshToken=function ()
{
  return jwt.sign({id:this._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN});
}

module.exports = mongoose.model('User', userSchema);
