const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get leaderboard with enhanced data
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const leaderboard = await User.find()
      .select('username xp level')
      .sort({ xp: -1 })
      .limit(limit);
    
    // Add rank to each user
    const leaderboardWithRank = leaderboard.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1
    }));
    
    res.json(leaderboardWithRank);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
});

// Get user's rank
router.get('/rank/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const rank = await User.countDocuments({ xp: { $gt: user.xp } }) + 1;
    
    res.json({ 
      rank, 
      xp: user.xp, 
      username: user.username,
      level: user.level 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user rank', error: error.message });
  }
});

// new api endpoint to get only beats percentage for current user
router.get('/my-relative-rank/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalUsers = await User.countDocuments();
    const rank = await User.countDocuments({ xp: { $gt: user.xp } }) + 1;
    const beatsPercent = ((totalUsers - rank) / totalUsers) * 100;

    res.json({ beatsPercent: Math.round(beatsPercent) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching beats percentage' });
  }
});


module.exports = router;
