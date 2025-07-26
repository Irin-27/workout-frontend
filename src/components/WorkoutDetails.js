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

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  // Calculate total weight
  const totalWeight = workout.load * workout.reps

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      
      <div className="workout-meta">
        <div className="workout-stat">
          <div className="workout-stat-value">{workout.load}</div>
          <div className="workout-stat-label">kg</div>
        </div>
        <div className="workout-stat">
          <div className="workout-stat-value">{workout.reps}</div>
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