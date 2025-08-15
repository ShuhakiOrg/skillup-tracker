const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get public profile by username
router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ 
      username: req.params.username,
      isPublicProfile: true 
    }).select('-password -email');
    
    if (!user) {
      return res.status(404).json({ message: 'Profile not found or private' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update user's own profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { bio, isPublicProfile, profileImage } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { bio, isPublicProfile, profileImage },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Get user's own profile
router.get('/my-profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Search public profiles
router.get('/search', async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query required' });
    }
    
    const users = await User.find({
      username: { $regex: q, $options: 'i' },
      isPublicProfile: true
    })
    .select('username xp level badges totalModulesCompleted')
    .limit(parseInt(limit));
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error searching profiles', error: error.message });
  }
});

module.exports = router;
