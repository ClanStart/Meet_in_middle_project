import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">🤝 Meet in the Middle</div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create">Create Meeting</Link></li>
        <li><Link to="/details">Share Location</Link></li>
        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
      </ul>

      <div className="navbar-user">
        {user?.name} 📱 {user?.phone}
      </div>
    </nav>
  );
};

export default Navbar;