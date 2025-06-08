import React, { useEffect, useState } from "react";
import "../../css/MedicalRecords.css";
import api from "../../api";

export default function MedicalRecords({id , isRecords}) {
  const [data, setData] = useState({
    prescriptions: ["Paracetamol - 500mg", "Ibuprofen - 200mg"],
  testReports: ["Blood Test - Normal", "X-Ray - No issues"],
  });
  const [records , setRecords] = useState({});
  useEffect(() => {
    const fetchRecords = async ()=>{
        const res = await api.get(`iot-data/patient/${id}/recent`);
        setRecords(res.data)
      }

      if (isRecords) {
        fetchRecords();
      }

  }, [isRecords]);

  
  const recordsArray = Array.isArray(records)
  ? records
  : Object.values(records);

  return (
    <div className="records-page">
      <h1>📄 Your Medical Records</h1>

      <section className="record-section">
        <h2>💊 Prescriptions</h2>
        <ul>
          {data.prescriptions?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="record-section">
        <h2>🧪 Test Reports</h2>
        <ul>
          {data.testReports?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="record-section">
        <h2>📊 Last 7 Records</h2>
        <div className="records-grid">
          {recordsArray.map((record, index) => (
            <div key={index} className="record-card">
            <p><strong>Timestamp:</strong> {record.createdAt ? new Date(record.createdAt).toLocaleString() : 'N/A'}</p>
            <p><strong>Heart Rate:</strong> {record.heart_rate || 'N/A'} bpm</p>
            <p><strong>Body Temp:</strong> {record.body_temperature || record.field1 || 'N/A'} °F</p>
            <p><strong>Room Temp:</strong> {record.room_temperature || record.field2 || 'N/A'} °F</p>
            <p><strong>Oxygen Level:</strong> {record.O2_level || record.field3 || 'N/A'}%</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}