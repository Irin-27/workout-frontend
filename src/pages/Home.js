import React from "react";
import { useEffect, useMemo, useState } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) {
        setIsLoading(false)
        return;
      }
      
      try {
        setIsLoading(true)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/workouts`, {
          headers: {'Authorization': `Bearer ${user.token}`},
        })
        
        if (response.ok) {
          const json = await response.json()
          dispatch({ type: 'SET_WORKOUTS', payload: json })
        } else {
          console.error('Failed to fetch workouts:', response.status, response.statusText)
          if (response.status === 503) {
            console.log('Backend is hibernating, initializing with empty array')
          }
          // Set empty array if fetch fails
          dispatch({ type: 'SET_WORKOUTS', payload: [] })
        }
      } catch (error) {
        console.error('Error fetching workouts:', error)
        // Set empty array if error occurs
        dispatch({ type: 'SET_WORKOUTS', payload: [] })
      } finally {
        setIsLoading(false)
      }
    }

    fetchWorkouts()
  }, [dispatch, user])

  // Calculate statistics - handle both null and empty array cases
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
    const totalWeight = workouts.reduce((sum, workout) => {
      const load = parseFloat(workout.load) || 0
      const reps = parseInt(workout.reps) || 0
      return sum + (load * reps)
    }, 0)
    const totalReps = workouts.reduce((sum, workout) => {
      return sum + (parseInt(workout.reps) || 0)
    }, 0)
    const avgWeight = totalWorkouts > 0 ? Math.round(totalWeight / totalWorkouts) : 0

    return {
      totalWorkouts,
      totalWeight: Math.round(totalWeight),
      totalReps,
      avgWeight
    }
  }, [workouts])

  // Ensure workouts is always an array for rendering
  const workoutsList = workouts || []

  // Show loading state while fetching workouts
  if (isLoading && workouts === null) {
    return (
      <div className="home">
        <div className="loading-container">
          <div className="loading"></div>
          <p>Loading workouts...</p>
        </div>
      </div>
    )
  }

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
            {workoutsList.length > 0 ? (
              workoutsList.map((workout) => (
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