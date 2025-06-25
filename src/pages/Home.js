import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🏠 Welcome, {user?.name}!</h1>
      <p>Your registered phone: {user?.phone}</p>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/create">
          <button style={btnStyle}>📍 Create Meeting</button>
        </Link>
        <br /><br />
        <Link to="/details">
          <button style={btnStyle}>📡 Share Location</button>
        </Link>
      </div>
    </div>
  );
};

const btnStyle = {
  padding: '0.8rem 1.5rem',
  margin: '0.5rem',
  fontSize: '1rem',
  cursor: 'pointer',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '8px'
};

export default Home;