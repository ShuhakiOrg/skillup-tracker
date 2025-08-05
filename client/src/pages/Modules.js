import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Modules = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/modules')
      .then(res => setModules(res.data));
  }, []);

  return (
    <div>
      <h1>Available Modules</h1>
      <ul>
        {modules.map((mod) => (
          <li key={mod._id}>{mod.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Modules;
