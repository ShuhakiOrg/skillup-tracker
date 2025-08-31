import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import Dashboard from './pages/Dashboard'; 

function App() {
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

    </div>
  );
}

export default App;
