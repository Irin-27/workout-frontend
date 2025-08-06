import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        if (response.status === 503) {
          setError('Backend is starting up. Please wait a moment and try again.')
        } else {
          try {
            const json = await response.json()
            setError(json.error || 'Signup failed')
          } catch (e) {
            setError(`Signup failed (${response.status})`)
          }
        }
        setIsLoading(false)
        return
      }

      const json = await response.json()
      
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    } catch (error) {
      console.error('Signup error:', error)
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        setError('Cannot connect to server. Please check your internet connection.')
      } else {
        setError('Signup failed. Please try again.')
      }
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}