import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClick = () => {
    logout()
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>FitOrbit</h1>   
        </Link>
        
        {/* Mobile menu toggle button - visible only on small screens */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <nav className={menuOpen ? 'active' : ''}>
          {user && (
            <div>
              <span className="user-email">
                {user.email}
              </span>
              <button onClick={handleClick} className="logout-btn">Log out</button>
            </div>
          )}

          {!user && (
            <div>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Log in</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar