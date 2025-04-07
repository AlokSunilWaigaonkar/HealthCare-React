import React, { useState } from 'react';
import Logo from "../../images/logo.png";
import './DashboardNavbar.css';

const PatientNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const userFullName = 'Shreyas Kulkarni'; // You can fetch from context/token
  const initials = userFullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // TODO: Clear tokens, redirect to login
  };

  return (
    <div className="navbar">
        <a href="/"><img className='logo' src={Logo} alt="" /></a>
      <div className="navbar-title">SCP Group of Hospitals</div>

      <div style={{ position: 'relative' }}>
        <div className="user-icon" onClick={toggleDropdown}>
          {initials}
        </div>

        {showDropdown && (
          <div className="dropdown">
            <button>Profile</button>
            <button>Settings</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientNavbar;