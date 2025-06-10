// RegisterDoctor.jsx
import React, { useState } from "react";
import api from "../../../api";

export default function RegisterDoctor() {
  const [form, setForm] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/admin/register-doctor", form);
    alert("Doctor Registered ✅");
  };
  console.log(form)

  return (
    <form onSubmit={handleSubmit} className="register-doctor-form">
  <input
    type="text"
    name="firstName"
    onChange={handleChange}
    placeholder="First Name"
    required
  />
  <input
    type="text"
    name="lastName"
    onChange={handleChange}
    placeholder="Last Name"
    required
  />
  <input
    type="text"
    name="licenseNumber"
    onChange={handleChange}
    placeholder="License Number"
    required
  />
  <input
    type="text"
    name="specialization"
    onChange={handleChange}
    placeholder="Specialization"
    required
  />
  <input
    type="email"
    name="email"
    onChange={handleChange}
    placeholder="Email"
    required
  />
  <input
    type="text"
    name="qualification"
    onChange={handleChange}
    placeholder="Qualification"
    required
  />
  <input
    type="tel"
    name="phoneNumber"
    onChange={handleChange}
    placeholder="Phone Number"
    pattern="[0-9]{10}"
    required
  />

  <select name="gender" onChange={handleChange} required defaultValue="">
    <option value="" disabled>Gender</option>
    <option value="MALE">Male</option>
    <option value="FEMALE">Female</option>
    <option value="OTHER">Other</option>
  </select>

  <input
    type="date"
    name="dateOfBirth"
    onChange={handleChange}
    placeholder="Date of Birth"
    required
  />

  <input
    type="text"
    name="availabilityHours"
    onChange={handleChange}
    placeholder="e.g. 10 AM - 4 PM"
    required
  />

  <button type="submit">Register Doctor</button>
</form>
  );
}