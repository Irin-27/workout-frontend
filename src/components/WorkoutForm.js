import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [category, setCategory] = useState("strength");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    // Basic required fields
    const workout = { 
      title, 
      load, 
      reps,
      category 
    };
    
    // Add optional fields if they're filled in
    if (duration) workout.duration = duration;
    if (notes) workout.notes = notes;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/workouts`, {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields || []);
      } else {
        // Reset form
        setTitle("");
        setLoad("");
        setReps("");
        setCategory("strength");
        setDuration("");
        setNotes("");
        setError(null);
        setEmptyFields([]);
        setShowAdvanced(false);
        
        // Update context
        dispatch({ type: "CREATE_WORKOUT", payload: json });
      }
    } catch (err) {
      setError("Failed to add workout. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <form className="create workout-form" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
        placeholder="e.g. Bench Press"
      />

      <label>Category:</label>
      <select
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        <option value="strength">Strength Training</option>
        <option value="cardio">Cardio</option>
        <option value="flexibility">Flexibility</option>
        <option value="balance">Balance</option>
        <option value="hiit">HIIT</option>
      </select>

      <label>Load (kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button 
        type="button" 
        className="toggle-advanced"
        onClick={toggleAdvanced}
      >
        {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
      </button>

      {showAdvanced && (
        <div className="advanced-options">
          <label>Duration (minutes):</label>
          <input
            type="number"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            placeholder="Optional"
          />

          <label>Notes:</label>
          <textarea
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            placeholder="Any additional details about your workout"
          ></textarea>
        </div>
      )}

      <button 
        className="submit-button" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Workout"}
      </button>
      
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;