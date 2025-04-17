import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutStatsDashboard = () => {
  const { workouts } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    weeklyWorkouts: [],
    mostCommonExercise: '',
    averageLoad: 0,
    averageReps: 0
  });
  
  useEffect(() => {
    if (!workouts) return;
    
    // Calculate stats
    const calculateStats = () => {
      // Total workouts
      const totalWorkouts = workouts.length;
      
      // Weekly distribution
      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      }).reverse();
      
      const workoutsByDay = last7Days.map(date => {
        const count = workouts.filter(w => {
          const workoutDate = new Date(w.createdAt).toISOString().split('T')[0];
          return workoutDate === date;
        }).length;
        
        return {
          date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          count
        };
      });
      
      // Most common exercise
      const exerciseCounts = {};
      workouts.forEach(w => {
        exerciseCounts[w.title] = (exerciseCounts[w.title] || 0) + 1;
      });
      
      const mostCommonExercise = Object.entries(exerciseCounts)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
      
      // Average load and reps
      const avgLoad = workouts.reduce((sum, w) => sum + Number(w.load), 0) / totalWorkouts || 0;
      const avgReps = workouts.reduce((sum, w) => sum + Number(w.reps), 0) / totalWorkouts || 0;
      
      setStats({
        totalWorkouts,
        weeklyWorkouts: workoutsByDay,
        mostCommonExercise,
        averageLoad: avgLoad.toFixed(1),
        averageReps: avgReps.toFixed(1)
      });
    };
    
    calculateStats();
  }, [workouts]);
  
  if (!workouts) return <div>Loading stats...</div>;
  
  return (
    <div className="stats-dashboard">
      <h2 className="text-xl font-bold mb-4">Your Workout Stats</h2>
      
      <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stat-card bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total Workouts</h3>
          <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
        </div>
        
        <div className="stat-card bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Most Common Exercise</h3>
          <p className="text-2xl font-bold">{stats.mostCommonExercise}</p>
        </div>
        
        <div className="stat-card bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Avg. Load (kg)</h3>
          <p className="text-2xl font-bold">{stats.averageLoad}</p>
        </div>
        
        <div className="stat-card bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Avg. Reps</h3>
          <p className="text-2xl font-bold">{stats.averageReps}</p>
        </div>
      </div>
      
      <div className="chart-container bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Workouts This Week</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stats.weeklyWorkouts}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Workouts" fill="#1aac83" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WorkoutStatsDashboard;