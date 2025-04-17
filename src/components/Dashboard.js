import React, { useState } from "react";
import WorkoutStatsDashboard from "../components/WorkoutStatsDashboard";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutDetails from "../components/WorkoutDetails";

const Dashboard = () => {
  const { workouts } = useWorkoutsContext();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Your Workout Dashboard</h1>
        <div className="dashboard-tabs">
          <button 
            className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === "workouts" ? "active" : ""}`}
            onClick={() => setActiveTab("workouts")}
          >
            My Workouts
          </button>
          <button 
            className={`tab-button ${activeTab === "add" ? "active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            Add Workout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {activeTab === "overview" && (
          <div className="overview-tab">
            <WorkoutStatsDashboard />
            
            <div className="recent-workouts">
              <h3>Recent Workouts</h3>
              {workouts && workouts.slice(0, 3).map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))}
              {(!workouts || workouts.length === 0) && (
                <p className="no-workouts">You haven't added any workouts yet.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "workouts" && (
          <div className="workouts-tab">
            <div className="workouts-list">
              {workouts && workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))}
              {(!workouts || workouts.length === 0) && (
                <p className="no-workouts">You haven't added any workouts yet.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "add" && (
          <div className="add-workout-tab">
            <WorkoutForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;