import React, { useState } from "react";
import PatientCard from "./PatientCard";
import Data from "../../data"; 

export default function PatientList() {
  const [patients, setPatients] = useState(Data || []); // Store patient data
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div>
        <div className="patient-list row" style={{marginTop:"4rem"}}>
          {patients.map((patient,index) => {
            return(
            <PatientCard
              key={index}
              name={patient.name}
              contact={patient.contact}
              email={patient.email}
              gender={patient.gender}
            />)
        })}
        </div>
    </div>
  );
}
