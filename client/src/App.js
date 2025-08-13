// src/App.js
import React from 'react';
import Dashboard from './pages/Dashboard'; // Import your Dashboard component
import './App.css'; // Keep your main app CSS if it contains global styles

function App() {
  return (
    // The main container for your application, styled with Tailwind CSS classes
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/*
        This is where your Dashboard component will be rendered.
        It will show the loading spinner first, then the content.
      */}
      <Dashboard />
    </div>
  );
}

export default App;
