import React, { useState } from 'react';
import Logo from "../../images/logo.png";
import './DashboardNavbar.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const PatientNavbar = ({ firstName, lastName }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const userFullName = `${firstName} ${lastName}`;
  const initials = userFullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', {
        refreshToken: localStorage.getItem("refreshToken")
      });
    } catch (error) {
      console.error("Logout failed", error);
    }
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };
  const handleProfileClick = () => {
    navigate("/patientProfile");
  };

  return (
    <div className="navbar">
      <a href="/"><img className='logo' src={Logo} alt="Logo" /></a>
      <div className="navbar-title">SCP Group of Hospitals</div>

      <div style={{ position: 'relative' }}>
        <div className="user-icon" onClick={toggleDropdown}>
          {initials}
        </div>

        {showDropdown && (
          <div className="dropdown">
            <button onClick={handleProfileClick}>Profile</button>
            <button>Settings</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientNavbar;