import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const UserProfile = () => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState({
    name: "",
    weight: "",
    height: "",
    fitnessGoal: "weight-loss"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile`, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        
        if (response.ok) {
          const json = await response.json();
          setProfile(json);
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [user]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(profile)
      });
      
      const json = await response.json();
      
      if (!response.ok) {
        setError(json.error);
      } else {
        setMessage("Profile updated successfully!");
        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };
  
  if (isLoading) return <div>Loading profile...</div>;
  
  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={profile.weight}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Height (cm):</label>
          <input
            type="number"
            name="height"
            value={profile.height}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Fitness Goal:</label>
          <select 
            name="fitnessGoal" 
            value={profile.fitnessGoal} 
            onChange={handleChange}
          >
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="endurance">Endurance</option>
            <option value="flexibility">Flexibility</option>
            <option value="overall-health">Overall Health</option>
          </select>
        </div>
        
        <button disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
        
        {error && <div className="error">{error}</div>}
        {message && <div className="success-message">{message}</div>}
      </form>
    </div>
  );
};

export default UserProfile;