import React, { useState } from 'react';

const GoalSetPage = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal]);
      setNewGoal('');
    }
  };

  const handleDeleteGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Set Your Goals</h1>
      <div>
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Enter a new goal"
        />
        <button onClick={handleAddGoal}>Add Goal</button>
      </div>
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>
            {goal}
            <button onClick={() => handleDeleteGoal(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalSetPage;