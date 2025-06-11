import React from "react";
import "./PatientRecords.css";
import { motion } from "framer-motion";
import { useLocation} from "react-router-dom";
import Navbar from './Navbar';
import { useState,useEffect } from "react";
import api from "../../api";
import mockEcgData from "../../data"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";



const PatientRecord = () => {
  const location = useLocation();

  const patientData = location.state || {};
  const [medical_records , setMedicalRecords] = useState({});



  useEffect(() => {
    const fetchRecords = async () => {
      const res = await api.get(`iot-data/patient/${patientData.id}/recent`);
      setMedicalRecords(res.data);
    };
  
    if (patientData.id) fetchRecords();
  }, [patientData.id]);
console.log(mockEcgData);

  const recordsArray = Array.isArray(medical_records)
  ? medical_records
  : Object.values(medical_records);

  return (
    <div>
      <Navbar />
      <div className="patient-records-container">

        {/* 👤 Patient Info outside the card */}
        <div className="patient-details" style={{ marginBottom: "1.5rem" }}>
          <h2>{patientData.name}</h2>
          <p><strong>Gender:</strong> {patientData.gender}</p>
          <p><strong>Contact:</strong> {patientData.contact}</p>
        </div>

        {recordsArray.map((record, index) => {
let ecgData = [];

if (record.field5) {
  // ✅ Use real ECG data if available
  ecgData = record.field5.split(',').map((val, i) => ({
    x: i * (1 / 250),  // 250Hz sampling
    y: parseFloat(val)
  }));
} else {
  // ✅ Match by patient id and record index (assuming 1-based)
  
  const fallback = mockEcgData.find(
    (entry) =>
      String(entry.id) === String(patientData.id) &&
      entry.record === index + 1
  );

  if (fallback && fallback.ecg) {
    ecgData = fallback.ecg.map((val, i) => ({
      x: i * (1 / 250),  // simulate time in seconds
      y: val
    }));
  }
}
const downsampled = ecgData.filter((_, i) => i % 5 === 0); // reduce points

  return (
    <motion.div
      key={index}
      className="record-card mb-3"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="record-info">
        <p><strong>Timestamp:</strong> {record.createdAt ? new Date(record.createdAt).toLocaleString() : 'N/A'}</p>
        <p><strong>Heart Rate:</strong> {record.heart_rate || 'N/A'} bpm</p>
        <p><strong>Body Temp:</strong> {record.body_temperature || record.field1 || 'N/A'} °F</p>
        <p><strong>Room Temp:</strong> {record.room_temperature || record.field2 || 'N/A'} °F</p>
        <p><strong>Oxygen Level:</strong> {record.O2_level || record.field3 || 'N/A'}%</p>
      </div>

      {ecgData.length > 0 && (
        <div className="ecg-graph">
          <h4>ECG (Electrocardiogram) Graph</h4>
          <ResponsiveContainer width="100%" height={200}>
  <LineChart data={downsampled}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey="x"
      label={{ value: 'Time (s)', position: 'insideBottomRight', offset: -5 }}
    />
    <YAxis
      label={{ value: 'Voltage (mV)', angle: -90, position: 'insideLeft' }}
      domain={[-1, 1]}
    />
    <Tooltip formatter={(value) => `${value} mV`} />
    <Line
      type="basis"
      dataKey="y"
      stroke="#ff4c4c"
      strokeWidth={2}
      dot={false}
    />
  </LineChart>
</ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
})}
      </div>
    </div>
  );
};

export default PatientRecord;