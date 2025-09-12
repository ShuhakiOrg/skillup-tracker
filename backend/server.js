const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI;

// Routes
const authRoutes = require('./routes/auth');
const moduleRoutes = require('./routes/modules');
const leaderboardRoutes = require('./routes/leaderboard_enhanced');
const profileRoutes = require('./routes/profiles');
const notificationRoutes = require('./routes/notifications');
require('./notification_scheduler'); // run cron job



app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/leaderboard', leaderboardRoutes); // changed from leaderboard to leaderboard_enhanced
app.use('/api/profiles', profileRoutes);
app.use('/api/notifications', notificationRoutes); 

// ✅ MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
