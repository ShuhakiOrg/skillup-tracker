const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: String,
  content: String,
  quiz: [{ question: String, options: [String], answer: String }]
});

module.exports = mongoose.model('Module', moduleSchema);
