import React, { useEffect, useState } from "react";
import "../../css/PatientProfile.css";
import api from "../../api"
import { useNavigate } from "react-router-dom";

const PatientProfile = () => {
  const [patient , setPatient ] = useState({});
  const navigate = useNavigate()

  useEffect(()=>{
    api.get("http://localhost:8080/patient/profile", { withCredentials: true })
    .then(res =>
      setPatient(res.data)
    )
    .catch(err => {
      console.error("Error fetching dashboard data:", err);
    })
  },[])


  const handleUpdateProfile = ()=>{
    navigate("/updateProfile",{ state: { patient: patient } })

  }


  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  const fullName = `${patient.firstName} ${patient.lastName}`;

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 Patient Profile</h2>

      <div className="profile-avatar-section">
        <div className="profile-avatar">{getInitials(patient.firstName,patient.lastName)}</div>
        <h3 className="avatar-name">{fullName}</h3>
        <button className="update-btn" onClick={handleUpdateProfile}>Update Profile</button>
      </div>

      <div className="profile-card text-center">
        <div className="profile-row">
          <span className="profile-label">Email:</span>
          <span className="profile-value">{patient.email}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Phone:</span>
          <span className="profile-value">{patient.contactNo}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Emergency Contact:</span>
          <span className="profile-value">{patient.emergencyContact}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Gender:</span>
          <span className="profile-value">{patient.gender}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Date of Birth:</span>
          <span className="profile-value">{new Date(patient.dateOfBirth).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long', 
    year: 'numeric',
  })}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Blood Group:</span>
          <span className="profile-value">{patient.bloodGroup}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Address:</span>
          <span className="profile-value">{patient.address}</span>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;