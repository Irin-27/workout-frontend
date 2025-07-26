import React from "react";
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/workouts/${workout._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      if (response.ok) {
        // Immediately update the UI by dispatching the delete action
        dispatch({ type: 'DELETE_WORKOUT', payload: workout })
      } else {
        console.error('Failed to delete workout:', response.status)
        // You could add error handling here, like showing a toast notification
      }
    } catch (error) {
      console.error('Error deleting workout:', error)
      // You could add error handling here
    }
  }

  // Calculate total weight with proper number handling
  const load = parseFloat(workout.load) || 0
  const reps = parseInt(workout.reps) || 0
  const totalWeight = load * reps

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      
      <div className="workout-meta">
        <div className="workout-stat">
          <div className="workout-stat-value">{load}</div>
          <div className="workout-stat-label">kg</div>
        </div>
        <div className="workout-stat">
          <div className="workout-stat-value">{reps}</div>
          <div className="workout-stat-label">reps</div>
        </div>
        <div className="workout-stat">
          <div className="workout-stat-value">{totalWeight}</div>
          <div className="workout-stat-label">total</div>
        </div>
      </div>
      
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails