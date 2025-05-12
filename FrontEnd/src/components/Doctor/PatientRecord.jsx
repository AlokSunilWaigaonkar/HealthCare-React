import React from "react";
import "./PatientRecords.css";
import Data from "../../data";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const generateSampleECG = () => {
  const data = [];
  for (let i = 0; i <= 30; i++) {
    const y =
      Math.sin(i * 0.5) * 30 +
      (Math.random() * 10 - 5) +
      (i % 10 === 0 ? Math.random() * 50 + 20 : 0);
    data.push({ x: i, y });
  }
  return data;
};

const PatientRecords = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedName = location.state?.name;
  const selectedContact = location.state?.contact;

  if (!selectedName || !selectedContact) {
    return (
      <div className="patient-records-container">
        <p>No patient selected. Please go back and select a patient.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const selectedPatient = Data.find(
    (p) => p.name === selectedName && p.contact === selectedContact
  );

  if (!selectedPatient) {
    return (
      <div className="patient-records-container">
        <p>Patient not found.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const { name, gender, contact, medical_records } = selectedPatient;

  return (
    <div>
      <Navbar />
      <div className="patient-records-container">

        {/* 👤 Patient Info outside the card */}
        <div className="patient-details" style={{ marginBottom: "1.5rem" }}>
          <h2>{name}</h2>
          <p><strong>Gender:</strong> {gender}</p>
          <p><strong>Contact:</strong> {contact}</p>
        </div>

        {/* 📋 Medical Records and Graph inside the card */}
        <motion.div
          className="record-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="record-info">
            <p><strong>ECG:</strong> {medical_records.ECG}</p>
            <p><strong>Heart Rate:</strong> {medical_records.heart_rate} bpm</p>
            <p><strong>Body Temp:</strong> {medical_records.body_temperature} °F</p>
            <p><strong>Room Temp:</strong> {medical_records.room_temperature} °F</p>
            <p><strong>Oxygen Level:</strong> {medical_records.O2_level}%</p>
          </div>

          <div className="ecg-graph">
            <h4>ECG Graph</h4>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={generateSampleECG()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientRecords;