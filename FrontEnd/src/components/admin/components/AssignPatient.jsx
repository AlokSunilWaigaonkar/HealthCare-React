import React, { useState, useEffect } from "react";
import api from "../../../api";

export default function AssignPatient() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [doctorSearch, setDoctorSearch] = useState("");
  const [patientSearch, setPatientSearch] = useState("");

  const [selectedDoctor, setSelectedDoctor] = useState({ id: "", name: "" });
  const [selectedPatient, setSelectedPatient] = useState({ id: "", name: "" });

  useEffect(() => {
    const fetchData = async () => {
      const doctorsRes = await api.get("/admin/get-doctors");
      const patientsRes = await api.get("/admin/get-patients");
      setDoctors(doctorsRes.data.data);
      setPatients(patientsRes.data.data);
    };
    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!selectedDoctor.id || !selectedPatient.id) {
      alert("Please select both doctor and patient.");
      return;
    }

    await api.post(
      `/admin/assign-patient?doctorId=${selectedDoctor.id}&patientId=${selectedPatient.id}`
    );
    alert("Patient Assigned Successfully ✅");

    // Clear selections
    setSelectedDoctor({ id: "", name: "" });
    setSelectedPatient({ id: "", name: "" });
    setDoctorSearch("");
    setPatientSearch("");
  };

  // Helper to match search against first or last name
  const nameMatch = (item, search) => {
    const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
    return (
      item.firstName.toLowerCase().includes(search.toLowerCase()) ||
      item.lastName.toLowerCase().includes(search.toLowerCase()) ||
      fullName.includes(search.toLowerCase())
    );
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Assign Patient to Doctor</h2>

      {/* Doctor Search */}
      <label>Search Doctor</label>
      <input
        type="text"
        placeholder="Type doctor's name..."
        value={doctorSearch}
        onChange={(e) => setDoctorSearch(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 4 }}
      />
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          maxHeight: 100,
          overflowY: "auto",
          border: "1px solid #ccc",
        }}
      >
        {doctors
          .filter((doc) => nameMatch(doc, doctorSearch))
          .map((doc) => (
            <li
              key={doc.id}
              onClick={() => {
                setSelectedDoctor({
                  id: doc.id,
                  name: `${doc.firstName} ${doc.lastName}`,
                });
                setDoctorSearch(`${doc.firstName} ${doc.lastName}`);
              }}
              style={{
                padding: 8,
                cursor: "pointer",
                background:
                  selectedDoctor.id === doc.id ? "#e0f7fa" : "#fff",
              }}
            >
              {doc.firstName} {doc.lastName}
            </li>
          ))}
      </ul>

      {/* Patient Search */}
      <label style={{ marginTop: 20, display: "block" }}>Search Patient</label>
      <input
        type="text"
        placeholder="Type patient's name..."
        value={patientSearch}
        onChange={(e) => setPatientSearch(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 4 }}
      />
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          maxHeight: 100,
          overflowY: "auto",
          border: "1px solid #ccc",
        }}
      >
        {patients
          .filter((pat) => nameMatch(pat, patientSearch))
          .map((pat) => (
            <li
              key={pat.id}
              onClick={() => {
                setSelectedPatient({
                  id: pat.id,
                  name: `${pat.firstName} ${pat.lastName}`,
                });
                setPatientSearch(`${pat.firstName} ${pat.lastName}`);
              }}
              style={{
                padding: 8,
                cursor: "pointer",
                background:
                  selectedPatient.id === pat.id ? "#e0f7fa" : "#fff",
              }}
            >
              {pat.firstName} {pat.lastName}
            </li>
          ))}
      </ul>

      {/* Hidden ID inputs */}
      <div style={{ marginTop: 10 }}>
        <p>
          Selected Doctor ID: <strong>{selectedDoctor.id}</strong>
        </p>
        <p>
          Selected Patient ID: <strong>{selectedPatient.id}</strong>
        </p>
      </div>

      <button
        onClick={handleAssign}
        style={{ marginTop: 20, padding: "10px 20px", cursor: "pointer" }}
      >
        Assign
      </button>
    </div>
  );
}