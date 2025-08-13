import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PublicProfile.css';

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(http://localhost:5000/api/profiles/public/);
      setProfile(response.data);
      setError(null);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Profile not found or not public');
      } else {
        setError('Failed to load profile');
      }
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const shareProfile = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: ${profile.username}'s SkillUp Profile,
        text: Check out 's learning progress!,
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Profile URL copied to clipboard!');
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!profile) return <div className="error">Profile not found</div>;

  return (
    <div className="public-profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {profile.username.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>{profile.username}</h1>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">{profile.rank}</span>
              <span className="stat-label">Rank</span>
            </div>
            <div className="stat">
              <span className="stat-value">{profile.level}</span>
              <span className="stat-label">Level</span>
            </div>
            <div className="stat">
              <span className="stat-value">{profile.xp.toLocaleString()}</span>
              <span className="stat-label">XP</span>
            </div>
          </div>
        </div>
        <button className="share-btn" onClick={shareProfile}>
          🔗 Share Profile
        </button>
      </div>

      <div className="profile-content">
        <div className="achievements-section">
          <h2>🏆 Achievements</h2>
          <div className="achievement-grid">
            <div className="achievement-card">
              <div className="achievement-icon">🎯</div>
              <div className="achievement-info">
                <h3>Level {profile.level} Learner</h3>
                <p>Reached level {profile.level}</p>
              </div>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">⭐</div>
              <div className="achievement-info">
                <h3>XP Master</h3>
                <p>{profile.xp.toLocaleString()} XP earned</p>
              </div>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">🏅</div>
              <div className="achievement-info">
                <h3>Rank #{profile.rank}</h3>
                <p>Current leaderboard position</p>
              </div>
            </div>
          </div>
        </div>

        <div className="progress-section">
          <h2>📈 Learning Progress</h2>
          <div className="progress-card">
            <div className="progress-info">
              <span>Level {profile.level}</span>
              <span>{profile.xp} XP</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: ${(profile.xp % 100)}% }}
              ></div>
            </div>
            <div className="progress-text">
              {100 - (profile.xp % 100)} XP to next level
            </div>
          </div>
        </div>

        <div className="motivation-section">
          <h2>🚀 Keep Learning!</h2>
          <p>This learner is making great progress. Join the community and start your own learning journey!</p>
          <button className="cta-btn">Start Learning</button>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
