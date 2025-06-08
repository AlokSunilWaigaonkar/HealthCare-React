import React, { useEffect, useState } from "react";
import api from "../../../api";
import "./PatientList.css";

export default function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get("/admin/get-patients").then((res) => {
      setPatients(res.data.data || []);
    });
  }, []);

  const removePatient = async (patientId) => {
    if (window.confirm("Are you sure you want to remove this patient?")) {
      await api.delete(`/admin/remove-patient/${patientId}`);
      setPatients((prev) => prev.filter((pat) => pat.id !== patientId));
      alert("Patient removed ❌");
    }
  };

  return (
    <div className="patients-table-container">
      <h3>🧑‍🦰 Patients List</h3>
      <div className="table-scroll-wrapper">
        <table className="patients-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Contact No</th>
              <th>Emergency Contact</th>
              <th>Blood Group</th>
              <th>Address</th>
              <th>Medical History</th>
              <th>Assigned Doctors</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan={13} style={{ textAlign: "center", color: "#888" }}>
                  No patients found.
                </td>
              </tr>
            ) : (
              patients.map((pat, idx) => (
                <tr key={pat.id}>
                  <td>{idx + 1}</td>
                  <td>{pat.firstName} {pat.lastName}</td>
                  <td>{pat.email}</td>
                  <td>{pat.age}</td>
                  <td>{pat.gender}</td>
                  <td>{pat.dateOfBirth ? new Date(pat.dateOfBirth).toLocaleDateString() : ""}</td>
                  <td>{pat.contactNo}</td>
                  <td>{pat.emergencyContact}</td>
                  <td>{pat.bloodGroup}</td>
                  <td>{pat.address}</td>
                  <td>{pat.medicalHistory}</td>
                  <td>
                    {pat.doctors && pat.doctors.length > 0 ? (
                      <ul>
                        {pat.doctors.map((doc) => (
                          <li key={doc.id}>{doc.firstName} {doc.lastName}</li>
                        ))}
                      </ul>
                    ) : (
                      <span style={{ color: "#888" }}>No Doctor Assigned</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removePatient(pat.id)}
                    >
                      🗑 Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}