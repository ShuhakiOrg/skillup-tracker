// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner'; // Import the LoadingSpinner component

/**
 * A Dashboard component that demonstrates data fetching and loading indicator usage.
 * It simulates fetching user statistics and displays a spinner while loading.
 */
function Dashboard() {
  // isLoading: boolean state to track if data is currently being fetched
  const [isLoading, setIsLoading] = useState(true);
  // stats: state to hold the fetched data
  const [stats, setStats] = useState(null);
  // error: state to hold any error message during data fetching
  const [error, setError] = useState(null);

  // useEffect hook to handle data fetching when the component mounts
  useEffect(() => {
    // This function handles the asynchronous data fetch
    const fetchData = async () => {
      try {
        // --- Simulated Fetch replaced with a more realistic fetch placeholder ---
        // In a real application, you would replace this with an actual API call
        // using fetch or a library like Axios.
        const response = await fetch('/api/dashboard/stats'); // Example API endpoint
        if (!response.ok) {
          // If the server responds with an error status (e.g., 404, 500)
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data); // Update the stats state with fetched data
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setError("Failed to load dashboard statistics. Please try again."); // Set user-friendly error message
      } finally {
        setIsLoading(false); // Always set loading to false once the operation completes (success or failure)
      }
    };

    // Optional: Add a delayed visibility pattern to avoid spinner flickering
    // This shows the spinner only if loading takes longer than 200ms
    const timer = setTimeout(() => {
      fetchData(); // Initiate the fetch after the delay
    }, 200); // Only show spinner after 200ms

    // Cleanup function for the timer
    return () => clearTimeout(timer);

  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // --- Error Handling UX ---
  // If an error occurred during data fetching, display an error message
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-xl font-semibold text-center p-4 rounded-lg bg-red-100 shadow-md">
          {error}
        </p>
      </div>
    );
  }

  // --- Spinner Centering & Conditional Rendering ---
  // If isLoading is true (and no error), show the LoadingSpinner
  // Inside Dashboard.js, replace spinner div with this
if (isLoading) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <LoadingSpinner size={80} />
      <p className="loading-text sm:text-base">
        Loading your progress...
      </p>
    </div>
  );
}


  // If data has loaded (isLoading is false and no error), render the dashboard content
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Progress Dashboard</h2>

      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-blue-100 rounded-lg shadow-sm">
            <p className="text-xl font-semibold text-blue-700">Total Goals</p>
            <p className="text-4xl font-extrabold text-blue-900 mt-2">{stats.totalGoals}</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg shadow-sm">
            <p className="text-xl font-semibold text-green-700">Completed</p>
            <p className="text-4xl font-extrabold text-green-900 mt-2">{stats.completedGoals}</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg shadow-sm">
            <p className="text-xl font-semibold text-yellow-700">In Progress</p>
            <p className="text-4xl font-extrabold text-yellow-900 mt-2">{stats.inProgressGoals}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-8">
          No stats available.
        </p>
      )}

      {stats && (
        <p className="text-sm text-gray-500 text-right mt-6">
          Last updated: {stats.lastUpdated}
        </p>
      )}
    </div>
  );
}

export default Dashboard;
