import React, { useState } from 'react';
import './App.css';

function App() {
  const [date, setDate] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://dob-api1.onrender.com/getDayOfWeek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://dob-frontend.onrender.com' 
        },
        body: JSON.stringify({ date }),
      });
      const data = await response.json();
      setDayOfWeek(data.dayOfWeek);
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Get Day of Week</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Enter date in DDMMYYYY format"
        />
        <button type="submit">Get Day of Week</button>
      </form>
      {dayOfWeek && <p>Day of the week: {dayOfWeek}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
