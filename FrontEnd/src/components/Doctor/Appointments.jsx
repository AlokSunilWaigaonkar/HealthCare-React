import React, { useEffect, useState } from "react";
import api from "../../api";
import "../../css/Appointments.css";
import Navbar from "./Navbar";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdate, setStatusUpdate] = useState({});
  const doctorId = localStorage.getItem("id");
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get(`/doctor/${doctorId}/appointments`);
        setAppointments(res.data.data); // Accessing data inside ApiResponseDTO
      } catch (error) {
        console.error("Error fetching appointments", error);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) fetchAppointments();
  }, [doctorId]);

  const handleStatusChange = (appointmentId, newStatus) => {
    setStatusUpdate((prev) => ({
      ...prev,
      status:newStatus
    }));
  };


  const updateStatus = async (appointmentId) => {
    try {
      await api.put(`/doctor/appointments/${appointmentId}/status`,{
        appointmentId: appointmentId,
      status: statusUpdate.status
      });

      // Refresh appointment list
      const res = await api.get(`doctor/${doctorId}/appointments`);
      setAppointments(res.data.data);
      alert("✅ Status updated successfully!");
    } catch (error) {
      console.error("Failed to update status", error);
      alert("❌ Failed to update status");
    }
  };

  if (loading) return <p>Loading appointments...</p>;

  return (
    <>
    <Navbar/>
      <div className=" mt-3 appointments-container">
        <h2>📋 All Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <div className="appointments-list">
            {appointments.map((appt) => (
              <div key={appt.appointmentId} className="appointment-card">
                <p><strong>Patient:</strong> {appt.patient.firstName +" "+ appt.patient.lastName}</p>
                <p><strong>Date:</strong> {new Date(appt.appointmentDate).toLocaleString()}</p>
                <p><strong>Reason:</strong> {appt.reason}</p>
                <p><strong>Status:</strong> {appt.status}</p>
                <select
                  value={statusUpdate[appt.id] || appt.status}
                  onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="COMPLETED">Completed</option>
                </select>
                <button className="btn btn-primary mt-2" onClick={() => updateStatus(appt.appointmentId)}>
                  Update Status
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}