// client/src/pages/Dashboard.js
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, ResponsiveContainer
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/profiles/dashboard", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setData(res.data);
    } catch (e) {
      console.error("Dashboard load error:", e);
      setData(getMock()); // fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const getMock = () => ({
    username: "demo_user",
    xp: 2500,
    level: 15,
    totalModulesCompleted: 8,
    currentStreak: 5,
    longestStreak: 12,
    totalStudyTime: 120,
    weeklyGoal: 5,
    weeklyProgress: 3,
    skillsProgress: [
      { skillName: "JavaScript", level: 3, experiencePoints: 450 },
      { skillName: "Python", level: 5, experiencePoints: 800 },
      { skillName: "React", level: 4, experiencePoints: 600 },
    ],
    recentActivities: [
      { moduleId: "1", completedAt: new Date(), timeSpent: 30 },
      { moduleId: "2", completedAt: new Date(), timeSpent: 45 },
      { moduleId: "3", completedAt: new Date(), timeSpent: 60 },
    ],
    lastActivityDate: new Date(),
  });

  if (loading) return <div className="dashboard">Loading Dashboard...</div>;
  if (!data) return <div className="dashboard">No data available.</div>;

  return (
    <div className="dashboard">
      <h1>📊 Dashboard</h1>

      {/* Summary Cards in Grid */}
      <div className="summary-grid">
        <div className="card">⭐ XP: {data.xp}</div>
        <div className="card">🏅 Level: {data.level}</div>
        <div className="card">📚 Modules: {data.totalModulesCompleted}</div>
        <div className="card">🔥 Streak: {data.currentStreak} days</div>
      </div>

      {/* Charts in Grid */}
      <div className="charts-grid">
        {/* Weekly Progress */}
        <div className="chart-card">
          <h2>📆 Weekly Progress</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { name: "Completed", value: data.weeklyProgress },
              { name: "Goal", value: data.weeklyGoal },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Progress */}
        <div className="chart-card">
          <h2>🛠 Skills Progress</h2>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={data.skillsProgress}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skillName" />
              <PolarRadiusAxis />
              <Radar
                name="Skills"
                dataKey="experiencePoints"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Study Time */}
      <div className="chart-card">
        <h2>⏱ Study Time (Recent)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={data.recentActivities.map((a) => ({
              date: new Date(a.completedAt).toLocaleDateString(),
              timeSpent: a.timeSpent,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="timeSpent" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activities */}
      <div className="activities-section">
        <h2>📝 Recent Activities</h2>
        <ul>
          {(data.recentActivities || []).map((a, i) => (
            <li key={i}>
              Module {a.moduleId?.title || a.moduleId} — {a.timeSpent} mins on{" "}
              {new Date(a.completedAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
        <small>Last activity: {new Date(data.lastActivityDate).toLocaleString()}</small>
        <br />
        <small>Total study time: {data.totalStudyTime} mins</small>
      </div>
    </div>
  );
};

export default Dashboard;
