import React from "react";
import { useEffect, useMemo } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) return;
      
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/workouts`, {
          headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()

        if (response.ok) {
          dispatch({type: 'SET_WORKOUTS', payload: json})
        }
      } catch (error) {
        console.error('Error fetching workouts:', error)
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  // Calculate statistics
  const stats = useMemo(() => {
    if (!workouts || workouts.length === 0) {
      return {
        totalWorkouts: 0,
        totalWeight: 0,
        totalReps: 0,
        avgWeight: 0
      }
    }

    const totalWorkouts = workouts.length
    const totalWeight = workouts.reduce((sum, workout) => sum + (workout.load * workout.reps), 0)
    const totalReps = workouts.reduce((sum, workout) => sum + workout.reps, 0)
    const avgWeight = Math.round(totalWeight / totalWorkouts)

    return {
      totalWorkouts,
      totalWeight,
      totalReps,
      avgWeight
    }
  }, [workouts])

  return (
    <div>
      {/* Statistics Section */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalWorkouts}</div>
            <div className="stat-label">Total Workouts</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalWeight.toLocaleString()}</div>
            <div className="stat-label">Total Weight (kg)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalReps}</div>
            <div className="stat-label">Total Reps</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.avgWeight}</div>
            <div className="stat-label">Avg Weight (kg)</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="home">
        <div className="workouts-container">
          <div className="workouts-header">
            <h2 className="workouts-title">Recent Workouts</h2>
          </div>
          <div className="workouts-list">
            {workouts && workouts.length > 0 ? (
              workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">💪</div>
                <p>No workouts yet. Add your first workout to get started!</p>
              </div>
            )}
          </div>
        </div>
        <WorkoutForm />
      </div>
    </div>
  )
}

export default Home