import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import Dashboard from './pages/Dashboard'; 
import { requestNotificationPermission, onMessageListener } from './firebase_notifications';
import Chatbot from './components/Chatbot'; 
 loading
import BackToTopButton from './components/Backtotopbutton';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import ThemeToggle from './components/ThemeToggle';
import Stats from './components/Stats'; 
import Testimonials from './components/Testimonials'; 

import Footer from './components/Footer';
import FAQ from './components/FAQ';
import ThemeToggle from './components/ThemeToggle';

footer
import Footer from './components/Footer';



import BackToTopButton from './components/Backtotopbutton'; 
main
 main

function App() {
   const [theme, setTheme] = useState(() => {
    // Check localStorage for a saved theme, otherwise default to 'light'
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };
  useEffect(() => {
    // Clear any existing theme classes from the body
    document.body.className = '';
    // Add the current theme class (e.g., 'dark-theme')
    document.body.classList.add(`${theme}-theme`);
    // Save the theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); // This code runs every time the 'theme' state changes


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
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
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

      {/* Why to choose section */}  
       {/*  about section */}

      <section id="about" className="about-section">
        <div className="section-content">
          <h2>Why Choose Skillup-Tracker?</h2>
          <p>
          Because learning shouldn’t be boring — it should feel like a game you love to win!
          Track your growth, compete with others and stay unstoppable on your learning journey.
          </p>
        </div>
      </section>

       {/* ✅ NEW: Stats Section */}
      <Stats />

      {/* Features Section */}
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
     {/* ✅ NEW: Testimonials Section */}
      <Testimonials />
      <FAQ /> {/* FAQ component */}
    </div>
  );
}

export default App;
