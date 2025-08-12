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

    const moduleData = await Module.findById(moduleId);
    if (!moduleData) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Award XP (adjustable amount)
    const xpAward = 50;
    req.user.xp += xpAward;
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
