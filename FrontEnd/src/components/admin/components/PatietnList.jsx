import React, { useEffect, useState } from "react";
import api from "../../../api";
import "./PatientList.css";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [channelMap, setChannelMap] = useState({});
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '...' }

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/admin/get-patients");
      const data = res.data.data || [];
      setPatients(data);

      const initMap = {};
      data.forEach((pat) => {
        initMap[pat.id] = pat.channelId || "";
      });
      setChannelMap(initMap);
    } catch (err) {
      showMessage("error", "Failed to fetch patients.");
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000); // auto clear after 3s
  };

  const removePatient = async (patientId) => {
    const confirm = window.confirm("Are you sure to delete?");
    if (!confirm) return;

    try {
      await api.delete(`/admin/remove-patient/${patientId}`);
      setPatients((prev) => prev.filter((pat) => pat.id !== patientId));
      showMessage("success", "Patient removed ❌");
    } catch {
      showMessage("error", "Failed to remove patient ❌");
    }
  };

  const assignChannel = async (patientId) => {
    const channelId = channelMap[patientId];
    if (!channelId || isNaN(channelId)) {
      showMessage("error", "Please enter a valid Channel ID.");
      return;
    }

    try {
      await api.put(`/admin/${patientId}/channel?channelId=${channelId}`);
      showMessage("success", "Channel ID assigned ✅");
    } catch {
      showMessage("error", "Failed to assign Channel ID ❌");
    }
  };

  const handleChannelChange = (e, patientId) => {
    const value = e.target.value;
    setChannelMap((prev) => ({
      ...prev,
      [patientId]: value,
    }));
  };

  return (
    <div className="patients-table-container">
      <h3>🧑‍🦰 Patients List</h3>

      {message && (
        <div className={`message-box ${message.type}`}>
          {message.text}
        </div>
      )}

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
              <th>Channel ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan={14} style={{ textAlign: "center", color: "#888" }}>
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
                  {pat.channelId && pat.channelId !== 0 ? (
  // Show channel ID and hide input/button if channelId is set and not 0
  <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
   {pat.channelId}
  </span>
) : (
  // Otherwise, show input and assign button
  <>
    <input
      type="text"
      value={channelMap[pat.id] || ""}
      onChange={(e) => handleChannelChange(e, pat.id)}
      placeholder="Channel ID"
      style={{ width: "90px" }}
    />
    <button
      className="assign-btn"
      onClick={() => assignChannel(pat.id)}
      style={{ marginLeft: "5px" }}
    >
      Assign
    </button>
  </>
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