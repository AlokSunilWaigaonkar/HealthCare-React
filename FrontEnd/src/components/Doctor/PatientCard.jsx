import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/PatientCard.css";
import defaultImage from "../../images/defaultImage.png";

export default function PatientCard({ name,id, contact, email, gender }) {
  const navigate = useNavigate();

  const handleRecordButton = () => {
    navigate("/patientRecord", {
      state: {
        name,
        contact,
        gender,
        email,
        id
      }
    });
  };;

  return (
    <div className="col-3">
      <div className="patient-card">
        <img src={defaultImage} className="patient-img" alt="Patient" />
        <h3 className="patient-name">{name}</h3>
        <p className="patient-info"><strong>Gender:</strong> {gender}</p>
        <p className="patient-info"><strong>Contact:</strong> {contact}</p>
        <button className="contact-btn" onClick={handleRecordButton}>
          View Records
        </button>
      </div>
    </div>
  );
}
