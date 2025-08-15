const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get leaderboard - top users by XP
router.get('/leaderboard', async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    const leaderboard = await User.find({ isPublicProfile: true })
      .select('username xp level badges totalModulesCompleted currentStreak')
      .sort({ xp: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const totalUsers = await User.countDocuments({ isPublicProfile: true });
    
    res.json({
      leaderboard,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        hasNext: skip + leaderboard.length < totalUsers,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
});

// Get user's rank
router.get('/rank/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const rank = await User.countDocuments({ 
      xp: { $gt: user.xp },
      isPublicProfile: true 
    });
    
    res.json({ rank: rank + 1, totalUsers: await User.countDocuments({ isPublicProfile: true }) });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user rank', error: error.message });
  }
});

// Get global stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isPublicProfile: true });
    const totalXP = await User.aggregate([
      { $group: { _id: null, total: { $sum: '$xp' } } }
    ]);
    
    const topUser = await User.findOne().sort({ xp: -1 }).select('username xp');
    
    res.json({
      totalUsers,
      activeUsers,
      totalXP: totalXP[0]?.total || 0,
      topUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

module.exports = router;
