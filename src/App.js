import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const { user } = useAuthContext();
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/workouts" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={user ? <UserProfile /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;