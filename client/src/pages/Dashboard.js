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
      {/* (keep all your chart and layout JSX here) */}
    </div>
  );
};

export default Dashboard;
