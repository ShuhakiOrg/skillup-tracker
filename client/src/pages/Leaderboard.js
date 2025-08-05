import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/leaderboard')
      .then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {users.map((user, i) => (
          <li key={user._id}>{i + 1}. {user.username} - XP: {user.xp}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
