const express = require('express');
const router = express.Router();
const Module = require('../models/Module');

router.get('/', async (req, res) => {
  const modules = await Module.find();
  res.json(modules);
});

module.exports = router;
