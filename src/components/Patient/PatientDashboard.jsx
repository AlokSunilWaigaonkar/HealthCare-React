import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/PatientDashboard.css";
import PatientNavbar from "./PatientNavbar"

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("Shreyas Kulkarni");
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    // Dummy Data
    setAppointments([
      { date: "2025-04-10", doctor: "Dr. Shreyas", department: "Cardiology" },
      { date: "2025-04-15", doctor: "Dr. Chaitali", department: "Dermatology" },
    ]);
    setPrescriptions([
      { date: "2025-03-20", file: "prescription1.pdf" },
      { date: "2025-03-30", file: "prescription2.pdf" },
    ]);

    // Uncomment when backend is ready
    /*
    axios.get("http://localhost:8080/api/patient/dashboard", { withCredentials: true })
      .then(res => {
        setPatientName(res.data.name);
        setAppointments(res.data.appointments);
        setPrescriptions(res.data.prescriptions);
      })
      .catch(err => console.log(err));
    */
  }, []);

  return (
    <div>
      <PatientNavbar />
      <div className="dashboard-wrapper">
       
        <h2 className="dashboard-title">Welcome, {patientName} 👋</h2>

        <div className="dashboard-grid">
          <div className="card">
            <h3>📁 Health Summary</h3>
            <p>You have {prescriptions.length} recent prescriptions.</p>
          </div>

          <div className="card">
            <h3>📅 Upcoming Appointments</h3>
            <ul>
              {appointments.map((apt, i) => (
                <li key={i}>
                  <strong>{apt.date}</strong> - {apt.doctor} ({apt.department})
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3>📝 Book Appointment</h3>
            <p>Choose your department, preferred date and time, and the doctor.</p>
            <button className="btn-primary">Book Now</button>
          </div>

          <div className="card clickable-card" onClick={() => navigate("/records")}>
            <h3>📂 View Medical Records</h3>
            <p>Access all your prescriptions, test reports, and previous visits.</p>
            <button className="btn-outline">View Records</button>
          </div>
        </div>
      </div>
    </div>
  );
}