import React, { useState } from "react";
import api from "../../api";
import "../../css/UpdateProfile.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const { patient } = location.state;

  const [formData, setFormData] = useState({
    id: patient.id,
    firstName: patient.firstName || "",
    lastName: patient.lastName || "",
    age: patient.age || "",
    gender: patient.gender || "",
    bloodGroup: patient.bloodGroup || "",
    emergencyContact: patient.emergencyContact || "",
    dateOfBirth: patient.dateOfBirth?.split("T")[0] || "",
    address: patient.address || "",
    contactNo: patient.contactNo || "",
    medicalHistory: patient.medicalHistory || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    setMessage(""); // Clear old message
    try {
      await api.put(`http://localhost:8080/patient/${formData.id}/update`, formData);
      setMessage("Profile updated successfully!");
      setMessageType("success");
      setTimeout(()=>navigate("/patientDashBoard"),3000)
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Update failed!";
      setMessage(errorMsg);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-container">
      <h2 className="update-header">Update Profile</h2>
      <div className="update-card">

        {/* Message Box */}
        {message && (
          <div className={`message-box ${messageType}`}>
            {message}
          </div>
        )}

        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="Blood Group (e.g., B+)" />
        <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="Emergency Contact Number" />
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} placeholder="Contact Number" />
        <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} placeholder="Medical History (if any)"></textarea>

        <button className="update-btn" onClick={handleUpdate} disabled={loading}>
          {loading ? <span className="loader"></span> : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;