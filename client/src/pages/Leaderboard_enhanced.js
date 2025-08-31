import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchLeaderboard();
  }, [limit]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/leaderboard?limit=");
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch leaderboard data');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '#';
    }
  };

  const handleViewProfile = (username) => {
    // Navigate to public profile
    window.open(/profile/, '_blank');
  };

  if (loading) return <div className="loading">Loading leaderboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>🏆 Leaderboard</h1>
        <p>Top learners by XP points</p>
        
        <div className="controls">
          <label>
            Show top:
            <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
        </div>
      </div>

      <div className="leaderboard-list">
        {users.length === 0 ? (
          <div className="no-data">No users found</div>
        ) : (
          users.map((user) => (
            <div key={user._id} className={leaderboard-item }>
              <div className="rank">
                {getRankIcon(user.rank)}
              </div>
              
              <div className="user-info">
                <div className="username">{user.username}</div>
                <div className="level">Level {user.level}</div>
              </div>
              
              <div className="xp-info">
                <div className="xp">{user.xp.toLocaleString()} XP</div>
              </div>
              
              <button 
                className="view-profile-btn"
                onClick={() => handleViewProfile(user.username)}
              >
                View Profile
              </button>
            </div>
          ))
        )}
      </div>

      <div className="leaderboard-footer">
        <p>Keep learning to climb the ranks! 🚀</p>
      </div>
    </div>
  );
};

export default Leaderboard;
