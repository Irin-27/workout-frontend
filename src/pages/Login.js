import React from "react";
import { useState } from "react"
import { Link } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div className="auth-container">
      <form className="login" onSubmit={handleSubmit}>
        <h3>Welcome Back</h3>
        
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
          placeholder="Enter your password"
          required
          disabled={isLoading}
        />

        <button disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="loading"></span>
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
        
        {error && <div className="error">{error}</div>}
        
        <div className="auth-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </div>
      </form>
    </div>
  )
}

export default Login