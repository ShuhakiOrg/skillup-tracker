const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
