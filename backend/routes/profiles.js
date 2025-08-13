const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get public profile by username
router.get('/public/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
      .select('username xp level');
    
    if (!user) {
      return res.status(404).json({ message: 'Public profile not found' });
    }
    
    // Get user's rank
    const rank = await User.countDocuments({ xp: { $gt: user.xp } }) + 1;
    
    const profileData = {
      ...user.toObject(),
      rank
    };
    
    res.json(profileData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching public profile', error: error.message });
  }
});

module.exports = router;
