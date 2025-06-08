import React, { useEffect, useState } from "react";
import api from "../../../api";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get("/admin/get-doctors").then((res) => setDoctors(res.data.data));
  }, []);

  const removeDoctor = async (doctorId) => {
    if (window.confirm("Are you sure you want to remove this doctor?")) {
      await api.delete(`/admin/remove-doctor/${doctorId}`);
      setDoctors((prev) => prev.filter((doc) => doc.id !== doctorId));
      alert("Doctor removed ❌");
    }
  };

  return (
    <div className="doctors-table-container">
      <h3>🧑‍⚕️ Doctors List</h3>
      <table className="doctors-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>License Number</th>
            <th>Specialization</th>
            <th>Phone</th>
            <th>Qualification</th>
            <th>Availability</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc, index) => (
            <tr key={doc.id}>
              <td>{index + 1}</td>
              <td>{doc.firstName} {doc.lastName}</td>
              <td>{doc.licenseNumber}</td>
              <td>{doc.specialization}</td>
              <td>{doc.phoneNumber}</td>
              <td>{doc.qualification}</td>
              <td>{doc.availabilityHours}</td>
              <td>
                <button className="remove-btn" onClick={() => removeDoctor(doc.id)}>🗑 Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}