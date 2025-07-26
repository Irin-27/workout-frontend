import React from "react";
import { useState } from "react"
import { Link } from "react-router-dom"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password)
  }

  return (
    <div className="auth-container">
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Join FitOrbit</h3>
        
        <label>Email Address:</label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
          placeholder="your.email@example.com"
          required
          disabled={isLoading}
        />
        
        <label>Password:</label>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
          placeholder="Create a strong password"
          required
          disabled={isLoading}
        />

        <button disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="loading"></span>
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
        
        {error && <div className="error">{error}</div>}
        
        <div className="auth-link">
          Already have an account? <Link to="/login">Sign in here</Link>
        </div>
      </form>
    </div>
  )
}

export default Signup