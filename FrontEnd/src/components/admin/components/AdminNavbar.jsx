import React from 'react'
import Logo from '../../../images/logo.png'
import api from '../../../api';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          await api.post('/auth/logout', {
            refreshToken: localStorage.getItem("refreshToken")
          });
          console.log("loggin out" )
        } catch (error) {
          console.log("log out failed doing local logout")
          console.error("Logout failed", error);
        }
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login", { replace: true });
      };
  return (
    <div className="  navbar">
      <a href="/"><img className='logo' src={Logo} alt="Logo" /></a>
      <div className="navbar-title">SCP Group of Hospitals</div>
      <button className='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AdminNavbar