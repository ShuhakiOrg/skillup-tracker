import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [beatsPercent, setBeatsPercent] = useState(null);

  const [formData, setFormData] = useState({
    bio: '',
    isPublicProfile: false,
    profileImage: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // For demo purposes, we'll use a mock user since auth isn't fully implemented
      // In a real app, you'd get the user ID from the auth context/token
      const mockUserId = '507f1f77bcf86cd799439011'; // This would come from auth
      
      const [profileRes, rankRes, beatsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/profiles/my-profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).catch(() => ({ data: getMockProfile() })),
        axios.get(`http://localhost:5000/api/leaderboard/rank/${mockUserId}`)
          .catch(() => ({ data: { rank: 1, totalUsers: 1 } })),
        axios.get(`http://localhost:5000/api/leaderboard/my-relative-rank/${mockUserId}`)
          .catch(() => ({ data: { beatsPercent: 0 } }))
      ]);

      setProfile(profileRes.data);
      setRank(rankRes.data);
      setBeatsPercent(beatsRes.data.beatsPercent || 0);

      setFormData({
        bio: profileRes.data.bio || '',
        isPublicProfile: profileRes.data.isPublicProfile || false,
        profileImage: profileRes.data.profileImage || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMockProfile = () => ({
    _id: '507f1f77bcf86cd799439011',
    username: 'demo_user',
    level: 15,
    xp: 2500,
    bio: 'Passionate learner exploring new technologies!',
    badges: ['First Module', 'Streak Master', 'Quick Learner'],
    isPublicProfile: true,
    profileImage: '',
    joinDate: new Date('2024-01-15'),
    totalModulesCompleted: 8,
    currentStreak: 5,
    longestStreak: 12
  });

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/profiles/profile', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).catch(() => ({ data: { ...profile, ...formData } }));

      setProfile(response.data);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const getLevelColor = (level) => {
    if (level >= 50) return '#FFD700';
    if (level >= 30) return '#C0C0C0';
    if (level >= 20) return '#CD7F32';
    return '#4CAF50';
  };

  const getProgressPercentage = () => {
    const xpForNextLevel = profile.level * 100;
    const currentLevelXP = (profile.level - 1) * 100;
    const progress = profile.xp - currentLevelXP;
    return Math.min((progress / (xpForNextLevel - currentLevelXP)) * 100, 100);
  };
const loadingSvg = process.env.PUBLIC_URL + "/loading1.svg";
  if (loading) {
    return (
      <div className="profile-container1">
        <div className="loading">
          <img src={loadingSvg} alt="Loading..." className="loading-icon" />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>👤 My Profile</h1>
        <button 
          onClick={() => setEditing(!editing)} 
          className="edit-btn"
        >
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar">
            {profile.profileImage ? (
              <img src={profile.profileImage} alt="Profile" />
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
                Beats {beatsPercent !== null ? `${beatsPercent}%` : '0%'} of users 🎉
              </span>
            </div>

            {editing ? (
              <div className="edit-form">
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  className="bio-input"
                />
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.isPublicProfile}
                      onChange={(e) => setFormData({ ...formData, isPublicProfile: e.target.checked })}
                    />
                    Make profile public
                  </label>
                </div>
                <div className="form-actions">
                  <button onClick={handleUpdateProfile} className="save-btn">
                    Save Changes
                  </button>
                  <button onClick={() => setEditing(false)} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="bio">{profile.bio || 'No bio yet. Click edit to add one!'}</p>
            )}
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
        <div className="badges-section">
          <h3>🏅 Badges Earned</h3>
          <div className="badges-grid">
            {profile.badges.length > 0 ? (
              profile.badges.map((badge, index) => (
                <div key={index} className="badge-item">
                  <span className="badge-icon">🏅</span>
                  <span className="badge-name">{badge}</span>
                </div>
              ))
            ) : (
              <p className="no-badges">No badges yet. Keep learning to earn them!</p>
            )}
          </div>
        </div>

        {/* Public Profile Link */}
        {profile.isPublicProfile && (
          <div className="public-link-section">
            <h3>🌐 Public Profile</h3>
            <p>Your profile is public and can be viewed by others.</p>
            <Link 
              to={`/profile/${profile.username}`} 
              className="public-link"
            >
              View Public Profile
            </Link>
          </div>
        )}

        {/* Join Date */}
        <div className="join-date">
          <p>Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
