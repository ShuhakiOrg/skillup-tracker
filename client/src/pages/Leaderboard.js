import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [pagination, setPagination] = useState({});
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLeaderboard();
    fetchStats();
  }, [currentPage]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/leaderboard/leaderboard?page=${currentPage}&limit=10`);
      setLeaderboard(response.data.leaderboard);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leaderboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const searchProfiles = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const response = await axios.get(`http://localhost:5000/api/profiles/search?q=${searchQuery}&limit=10`);
      setLeaderboard(response.data);
      setPagination({ currentPage: 1, totalPages: 1, totalUsers: response.data.length });
    } catch (error) {
      console.error('Error searching profiles:', error);
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getLevelColor = (level) => {
    if (level >= 50) return '#FFD700'; // Gold
    if (level >= 30) return '#C0C0C0'; // Silver
    if (level >= 20) return '#CD7F32'; // Bronze
    return '#4CAF50'; // Green
  };
const loadingSvg = process.env.PUBLIC_URL + "/loading1.svg";
  if (loading) {
    return (
      <div className="leaderboard-container1">
        <div className="loading">
          <img src={loadingSvg} alt="Loading..." className="loading-icon" />
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>🏆 Leaderboard</h1>
        <p>Top learners by experience points</p>
      </div>

      {/* Global Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Active Profiles</h3>
          <p>{stats.activeUsers || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total XP</h3>
          <p>{stats.totalXP?.toLocaleString() || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Top User</h3>
          <p>{stats.topUser?.username || 'N/A'}</p>
        </div>
      </div>

      {/* Search */}
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchProfiles()}
          />
          <button onClick={searchProfiles} className="search-btn">
            🔍
          </button>
        </div>
        {searchQuery && (
          <button onClick={() => { setSearchQuery(''); fetchLeaderboard(); }} className="clear-btn">
            Clear Search
          </button>
        )}
      </div>

      {/* Leaderboard Table */}
      <div className="leaderboard-table">
        <div className="table-header">
          <div className="rank-col">Rank</div>
          <div className="user-col">User</div>
          <div className="level-col">Level</div>
          <div className="xp-col">XP</div>
          <div className="modules-col">Modules</div>
          <div className="streak-col">Streak</div>
        </div>

        {leaderboard.map((user, index) => (
          <div key={user._id} className="table-row">
            <div className="rank-col">
              <span className="rank-icon">{getRankIcon((currentPage - 1) * 10 + index + 1)}</span>
            </div>
            <div className="user-col">
              <Link to={`/profile/${user.username}`} className="user-link">
                <div className="user-info">
                  <div className="username">{user.username}</div>
                  <div className="badges">
                    {user.badges?.slice(0, 3).map((badge, i) => (
                      <span key={i} className="badge">🏅</span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
            <div className="level-col">
              <span 
                className="level-badge"
                style={{ backgroundColor: getLevelColor(user.level) }}
              >
                {user.level}
              </span>
            </div>
            <div className="xp-col">{user.xp?.toLocaleString()}</div>
            <div className="modules-col">{user.totalModulesCompleted || 0}</div>
            <div className="streak-col">
              <span className="streak-fire">🔥</span>
              {user.currentStreak || 0}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!pagination.hasPrev}
            className="pagination-btn"
          >
            ← Previous
          </button>
          
          <span className="page-info">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!pagination.hasNext}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}

      {leaderboard.length === 0 && (
        <div className="no-results">
          <p>No users found. Try adjusting your search or check back later!</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
