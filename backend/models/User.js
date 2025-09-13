const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
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
  fcmTokens: [{ type: String }] 
});

module.exports = mongoose.model('User', userSchema);
