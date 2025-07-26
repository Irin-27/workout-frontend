import React from "react";
import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!user) {
      setError('You must be logged in')
      setIsLoading(false)
      return
    }

    const workout = {title, load, reps}

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/workouts`, {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
      setIsLoading(false)
    }
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyFields([])
      setIsLoading(false)
      dispatch({type: 'CREATE_WORKOUT', payload: json})
      
      // Show success feedback
      const button = e.target.querySelector('button[type="submit"]')
      const originalText = button.textContent
      button.textContent = 'Added! 💪'
      button.style.background = 'var(--success)'
      setTimeout(() => {
        button.textContent = originalText
        button.style.background = 'var(--gradient-primary)'
      }, 2000)
    }
  }

  // Handle input validation on blur
  const handleInputBlur = (field, value) => {
    if (!value.trim()) {
      setEmptyFields(prev => [...prev.filter(f => f !== field), field])
    } else {
      setEmptyFields(prev => prev.filter(f => f !== field))
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New Workout</h3>

      <label>Exercise Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        onBlur={(e) => handleInputBlur('title', e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
        placeholder="e.g., Bench Press"
        disabled={isLoading}
      />

      <label>Weight (kg):</label>
      <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        onBlur={(e) => handleInputBlur('load', e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
        placeholder="80"
        min="0"
        step="0.5"
        disabled={isLoading}
      />

      <label>Repetitions:</label>
      <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        onBlur={(e) => handleInputBlur('reps', e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
        placeholder="12"
        min="1"
        disabled={isLoading}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="loading"></span>
            Adding...
          </>
        ) : (
          'Add Workout'
        )}
      </button>
      
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm