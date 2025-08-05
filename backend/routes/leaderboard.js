const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const leaderboard = await User.find().sort({ xp: -1 }).limit(10);
  res.json(leaderboard);
});

module.exports = router;
