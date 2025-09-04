const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

const { authLimiter, generalLimiter } = require('./middleware/security/rateLimiter')
const helmetMiddleware = require('./middleware/security/helmet');
const hppMiddleware = require('./middleware/security/hpp');
const xssMiddleware = require('./middleware/security/xss');


// app.use(express.json());
app.use(express.json({ 'limit': '10mb' }))
app.use(cors());
app.use(helmetMiddleware);
app.use(hppMiddleware);
app.use(xssMiddleware);

const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI;

// Routes
const authRoutes = require('./routes/auth');
const moduleRoutes = require('./routes/modules');
const leaderboardRoutes = require('./routes/leaderboard_enhanced');
const profileRoutes = require('./routes/profiles');

// app.use('/api/auth',authRoutes);
app.use('/api/auth', authLimiter, authRoutes);

// app.use('/api/modules', moduleRoutes);
// app.use('/api/leaderboard', leaderboardRoutes); // changed from leaderboard to leaderboard_enhanced
// app.use('/api/profiles', profileRoutes);

app.use('/api/modules', generalLimiter, moduleRoutes);
app.use('/api/leaderboard', generalLimiter, leaderboardRoutes); // changed from leaderboard to leaderboard_enhanced
app.use('/api/profiles', generalLimiter, profileRoutes);


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