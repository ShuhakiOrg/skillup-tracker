import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './PublicProfile.css';

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [beatsPercent, setBeatsPercent] = useState(null);

  useEffect(() => {
    fetchPublicProfile();
  }, [username]);

  const fetchPublicProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const mockUserId = '507f1f77bcf86cd799439011';
      
      const [profileRes, rankRes, beatsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/profiles/profile/${username}`),
        axios.get(`http://localhost:5000/api/leaderboard/rank/${profile?._id || 'mock'}`)
          .catch(() => ({ data: { rank: 1, totalUsers: 1 } })),
        axios.get(`http://localhost:5000/api/leaderboard/my-relative-rank/${mockUserId}`)
          .catch(() => ({ data: { beatsPercent: 0 } }))
      ]);

      setProfile(profileRes.data);
      setRank(rankRes.data);
      setBeatsPercent(beatsRes.data.beatsPercent || 0);

    } catch (error) {
      console.error('Error fetching public profile:', error);
      setError('Profile not found or is private');
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    if (level >= 50) return '#FFD700';
    if (level >= 30) return '#C0C0C0';
    if (level >= 20) return '#CD7F32';
    return '#4CAF50';
  };

  const getProgressPercentage = () => {
    if (!profile) return 0;
    const xpForNextLevel = profile.level * 100;
    const currentLevelXP = (profile.level - 1) * 100;
    const progress = profile.xp - currentLevelXP;
    return Math.min((progress / (xpForNextLevel - currentLevelXP)) * 100, 100);
  };

  const getJoinDateString = () => {
    if (!profile?.joinDate) return 'Unknown';
    const date = new Date(profile.joinDate);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="public-profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="public-profile-container">
        <div className="error-message">
          <h2>Profile Not Found</h2>
          <p>{error}</p>
          <Link to="/leaderboard" className="back-link">
            ← Back to Leaderboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="public-profile-container">
      <div className="profile-header">
        <Link to="/leaderboard" className="back-link">
          ← Back to Leaderboard
        </Link>
        <h1>👤 {profile.username}'s Profile</h1>
      </div>

      <div className="profile-content">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar">
            {profile.profileImage ? (
              <img src={profile.profileImage} alt={`${profile.username}'s profile`} />
            ) : (
              <div className="avatar-placeholder">
                {profile.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="profile-info">
            <h2>{profile.username}</h2>
            <div className="level-info">
              <span 
                className="level-badge"
                style={{ backgroundColor: getLevelColor(profile.level) }}
              >
                Level {profile.level}
              </span>
              <span className="rank-info">
                Rank #{rank?.rank || 1} of {rank?.totalUsers || 1} users
              </span>
              <span className="beats-info">
                Beats {beatsPercent !== null ? `${beatsPercent}%` : '0%'} of users 🎉!
              </span>
              
            </div>
            
            {profile.bio && (
              <p className="bio">{profile.bio}</p>
            )}

            <div className="join-info">
              <span>Member since {getJoinDateString()}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total XP</h3>
            <p className="stat-value">{profile.xp.toLocaleString()}</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <small>Progress to Level {profile.level + 1}</small>
          </div>

          <div className="stat-card">
            <h3>Modules Completed</h3>
            <p className="stat-value">{profile.totalModulesCompleted}</p>
          </div>

          <div className="stat-card">
            <h3>Current Streak</h3>
            <p className="stat-value">
              🔥 {profile.currentStreak} days
            </p>
          </div>

          <div className="stat-card">
            <h3>Longest Streak</h3>
            <p className="stat-value">
              🏆 {profile.longestStreak} days
            </p>
          </div>
        </div>

        {/* Badges Section */}
        {profile.badges && profile.badges.length > 0 && (
          <div className="badges-section">
            <h3>🏅 Badges Earned</h3>
            <div className="badges-grid">
              {profile.badges.map((badge, index) => (
                <div key={index} className="badge-item">
                  <span className="badge-icon">🏅</span>
                  <span className="badge-name">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="share-section">
          <h3>🌐 Share This Profile</h3>
          <p>Share {profile.username}'s achievements with others!</p>
          <div className="share-actions">
            <button 
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="share-btn"
            >
              📋 Copy Link
            </button>
            <a 
              href={`https://twitter.com/intent/tweet?text=Check out ${profile.username}'s learning progress on SkillUp Tracker!&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn twitter"
            >
              🐦 Share on Twitter
            </a>
          </div>
        </div>

        {/* Achievement Highlights */}
        <div className="achievements-section">
          <h3>🎯 Achievement Highlights</h3>
          <div className="achievements-grid">
            {profile.level >= 20 && (
              <div className="achievement-item">
                <span className="achievement-icon">🌟</span>
                <div className="achievement-info">
                  <h4>Level {profile.level} Achiever</h4>
                  <p>Reached level {profile.level} through consistent learning</p>
                </div>
              </div>
            )}
            
            {profile.currentStreak >= 7 && (
              <div className="achievement-item">
                <span className="achievement-icon">🔥</span>
                <div className="achievement-info">
                  <h4>Streak Master</h4>
                  <p>Maintained a {profile.currentStreak}-day learning streak</p>
                </div>
              </div>
            )}
            
            {profile.totalModulesCompleted >= 5 && (
              <div className="achievement-item">
                <span className="achievement-icon">📚</span>
                <div className="achievement-info">
                  <h4>Module Master</h4>
                  <p>Completed {profile.totalModulesCompleted} learning modules</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
