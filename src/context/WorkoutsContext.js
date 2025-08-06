import React from "react";
import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS': 
      return {
        workouts: action.payload
      }
    case 'CREATE_WORKOUT':
      // Ensure we always have an array and add the new workout at the beginning
      return {
        workouts: state.workouts ? [action.payload, ...state.workouts] : [action.payload]
      }
    case 'DELETE_WORKOUT':
      // Ensure we have workouts before filtering
      if (!state.workouts) {
        return state
      }
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null  // Initialize as null to differentiate from empty array
  })

  console.log('WorkoutsContext state:', state)

  return (
    <WorkoutsContext.Provider value={{...state, dispatch}}>
      { children }
    </WorkoutsContext.Provider>
  )
}