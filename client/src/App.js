import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import Dashboard from './pages/Dashboard'; 
import { requestNotificationPermission, onMessageListener } from './firebase_notifications';
import { useEffect } from 'react';
import Chatbot from './components/Chatbot'; 
import BackToTopButton from './components/Backtotopbutton';

import Footer from './components/Footer';
import FAQ from './components/FAQ';


import Footer from './components/Footer';


import BackToTopButton from './components/Backtotopbutton'; 
function App() {
  useEffect(() => {
    // Request notification permission & send token to backend
    requestNotificationPermission();

    // Listen for all foreground messages
    onMessageListener().then((payload) => {
    if (payload?.notification) {
      alert(`${payload.notification.title}\n${payload.notification.body}`);
    }
  });
  }, []); // runs once when app loads
   
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              SkillUp Tracker
            </Link>
            <div className="nav-menu">
              <Link to="/leaderboard" className="nav-link">
                Leaderboard
              </Link>
              <Link to="/profile" className="nav-link">
                My Profile
              </Link>
              <Link to="/dashboard" className="nav-link"> {/* ✅ NEW */}
                Dashboard
              </Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:username" element={<PublicProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Chatbot /> {/* Chatbot component */}
        <BackToTopButton /> {/* Back to Top Button */}
        <Footer /> {/* Footer component */}
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h1>Welcome to SkillUp Tracker</h1>
      <p>Track your learning progress and compete with others!</p>
      
      <div className="home-actions">
        <Link to="/leaderboard" className="btn btn-primary">
          View Leaderboard
        </Link>
        <Link to="/profile" className="btn btn-secondary">
          My Profile
        </Link>
      </div>
          <section id="features" className="features-section">
  <div className="features-content">
    <h2>Key Features</h2>
    <div className="features-grid">
      <div className="feature">
        <h3>👤 Secure User Accounts</h3>
        <p>Register and log in safely with JWT-based authentication to keep your progress private.</p>
      </div>
      <div className="feature">
        <h3>🎯 Dynamic Goal Setting</h3>
        <p>Create, edit, and delete your learning goals with full control to adapt to your evolving needs.</p>
      </div>
      <div className="feature">
        <h3>🔗 Resource Hub</h3>
        <p>Keep materials organized by adding relevant links from blogs, YouTube, and more to each goal.</p>
      </div>
      <div className="feature">
        <h3>📓 Daily Progress Logging</h3>
        <p>Keep a daily or weekly log of your efforts and achievements to maintain momentum.</p>
      </div>
      <div className="feature">
        <h3>⭐ Earn XP Points</h3>
        <p>Stay motivated by earning experience points for every goal you complete, making learning fun.</p>
      </div>
      <div className="feature">
        <h3>📊 Visual Dashboard</h3>
        <p>Get a clear overview of your journey with a simple dashboard summarizing your goals and progress.</p>
      </div>
    </div>
  </div>
</section>
      <FAQ /> {/* FAQ component */}

    </div>
  );
}

export default App;
