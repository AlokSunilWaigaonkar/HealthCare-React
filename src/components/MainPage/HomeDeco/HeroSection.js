import React from "react";
import '../../../css/home.css' // Import CSS
import hospitalImage from '../../../images/hospitalImg.jpg'

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="">
        <img src={hospitalImage} alt="Hospital" className="hero-image" />
        <div className="hero-text">
          <h1 className="hero-title">SCP Group of Hospitals</h1>
          <p className="hero-subtitle">"Empowering Healthcare with Technology"</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;