import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/PatientDashboard.css";
import PatientNavbar from "./PatientNavbar";
import api from "../../api";
import MedicalRecords from "./MedicalRecords";
import BookAppointmentPage from "./BookAppointmentPage";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRecords , setIsRecords] = useState(false);
  const [bookAppointment, setBookAppointment] = useState(false);


  useEffect(() => {
    setLoading(true);
    api.get("http://localhost:8080/patient/profile", { withCredentials: true })
      .then(res => {
        setProfile(res.data);
        return api.get(`http://localhost:8080/patient/appointments`, { withCredentials: true });
      })
      .then(res => {
        setAppointments(res.data);
        setPrescriptions([
          { date: "2025-03-20", file: "prescription1.pdf" },
          { date: "2025-03-30", file: "prescription2.pdf" },
        ]);
      })
      .catch(err => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);
  

  return (
    <div>
      <PatientNavbar firstName={profile.firstName} lastName={profile.lastName} />

      <div className="dashboard-wrapper">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading dashboard...</p>
          </div>
        ) : (
          <>
            <div className="greeting">
              <h2>Welcome, {profile.firstName} {profile.lastName} 👋</h2>
              <p className="subtitle">Here’s your health overview.</p>
            </div>

            <div className="grid-container">
              {/* Health Summary */}
              <div className="dashboard-card">
                <h3>📁 Health Summary</h3>
                <p>You have <strong>{prescriptions.length}</strong> recent prescriptions.</p>
              </div>

              {/* Appointments */}
              <div className="dashboard-card">
                <h3>📅 Upcoming Appointments</h3>
                {appointments.length > 0 ? (
                  <ul className="appointment-list">
                    {appointments.map((apt, i) => (
                      <li key={i}>
                        <strong>{new Date(apt.appointmentDate).toLocaleDateString('en-GB',{
                          day:'2-digit',
                          month:'long',
                          year:'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</strong> - Dr.{apt.doctor.firstName + " " + apt.doctor.lastName} ({apt.doctor.specialization})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No appointments scheduled.</p>
                )}
              </div>

              {/* Book Appointment */}
              <div className="dashboard-card highlight-card">
                <h3>📝 Book Appointment</h3>
                <p>Choose department, date, time, and doctor.</p>
                <button onClick={() => setBookAppointment(!bookAppointment)} className="btn-primary">
                  Book Now
                </button>
              </div>

              <div className="dashboard-card clickable-card" onClick={() => setIsRecords(!isRecords)}>
                <h3>📂 View Medical Records</h3>
                <p>Access prescriptions, test reports, and visit history.</p>
                <button className="btn-outline">{ isRecords ? `Hide Records`:`View Records`}</button>
              </div>
            </div>
            {/* Medical Records */}
            
              {isRecords && <MedicalRecords id = {profile.id} isRecords={isRecords}/>}
              { bookAppointment &&  <BookAppointmentPage id = {profile.id} />}
          </>
        )}
      </div>
    </div>
  );
}