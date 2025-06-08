import React, { useState, useEffect } from "react";
import PatientCard from "./PatientCard";
import api from "../../api"; // import your api.js

export default function PatientList() {
  const [patients, setPatients] = useState([]);

  const doctorId = localStorage.getItem("id");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await api.get(`/doctor/${doctorId}/patients`);
        setPatients(res.data.data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
        setPatients([]);
      }
    };

    if (doctorId) {
      fetchPatients();
    }
  }, [doctorId]); 
  
  return (
    <div className="patient-list row" style={{ marginTop: "4rem" }}>
      {patients.length > 0 ? (
        patients.map((patient, index) => (
          <PatientCard
            key={index}
            name={patient.firstName + " " + patient.lastName}
            id = {patient.id}
            contact={patient.contactNo}
            email={patient.email}
            gender={patient.gender}
          />
        ))
      ) : (
        <p>No patients found.</p>
      )}
    </div>
  );
}