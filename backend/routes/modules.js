const express = require('express');
const router = express.Router();
const Module = require('../models/Module');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const modules = await Module.find();
  res.json(modules);
});

router.post('/:id/complete', auth, async (req, res) => {
  try {
    const moduleId = req.params.id;
    const { timeSpent = 30 } = req.body; // minutes (optional from client)

    const moduleData = await Module.findById(moduleId);
    if (!moduleData) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Award XP (adjustable amount)
    const xpAward = 50;
    req.user.xp += xpAward;
    // Append completion record
    req.user.completedModules = req.user.completedModules || [];
    req.user.completedModules.push({
      moduleId,
      completedAt: new Date(),
      timeSpent
    });

    // Update dashboard-related counters
    req.user.totalModulesCompleted = (req.user.totalModulesCompleted || 0) + 1;
    req.user.totalStudyTime = (req.user.totalStudyTime || 0) + Number(timeSpent);
    req.user.weeklyProgress = (req.user.weeklyProgress || 0) + 1;
    req.user.lastActivityDate = new Date();
    
    await req.user.save();

    res.json({
      message: 'Module completed, XP awarded!',
      xp: req.user.xp,
      user: req.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
