import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleClick = () => {
    logout()
    setMenuOpen(false)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Get user initials for avatar
  const getUserInitials = (email) => {
    if (!email) return 'U'
    const parts = email.split('@')[0].split('.')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return email.substring(0, 2).toUpperCase()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>FitOrbit</h1>   
        </Link>
        
        {/* Mobile menu toggle */}
        {isMobile && (
          <div className="menu-toggle" onClick={toggleMenu}>
            <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <nav className={menuOpen || !isMobile ? 'active' : ''}>
          {user && (
            <div className="nav-user">
              {!isMobile && (
                <div className="user-info">
                  <div className="avatar">
                    {getUserInitials(user.email)}
                  </div>
                  <span className="user-email">{user.email}</span>
                </div>
              )}
              {isMobile && (
                <span className="user-email">{user.email}</span>
              )}
              <button onClick={handleClick} className="logout-btn">
                {isMobile ? 'Log out' : '↗'}
              </button>
            </div>
          )}

          {!user && (
            <div className="nav-links">
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