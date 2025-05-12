import React from "react";
import Logo from "../../images/logo.png";
import '../../css/home.css'
import '../../css/navbar.css'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="Logo" style={{ width: "80px" }} />
        </a>
        <h1 className="header">SCP Group of Hospitals</h1>

        
        <div className="buttons">
       <Link to='/signup' className={` nav-btn btn btn-outline-success  `}>Sign Up</Link>
          
        
          <div >
            <Link to="/login"
              className="btn nav-btn btn-outline-success"
            >
              Log In
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
