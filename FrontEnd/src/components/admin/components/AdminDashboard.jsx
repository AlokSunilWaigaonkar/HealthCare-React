import React, { useState } from "react";
import RegisterDoctor from "./RegisterDoctor";
import AdminRequests from "./AdminRequests";
import AssignPatient from "./AssignPatient";
import DoctorsList from "./DoctorsList";
import UsersList from "./UserList";
import PatientsList from "./PatietnList";
import AdminNavbar from "./AdminNavbar";
import "./AdminDashboard.css"

// import StatsOverview from "./StatsOverview"; // separate stats component

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("stats");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      
      case "registerDoctor":
        return <RegisterDoctor />;
      case "adminRequests":
        return <AdminRequests />;

    case "users":
        return <UsersList/>;
    case "patients":
        return <PatientsList/>;
      
      case "doctors":
        return (
          <DoctorsList onHistoryClick={(id) => {
            setSelectedDoctorId(id);
            setActiveTab("doctorHistory");
          }} />
        );
      
      case "assignPatient":
        return <AssignPatient />;
      
    }
  };

  return (
    <div>
    <AdminNavbar/>
      <div className=" mt-3 admin-dashboard">
        {/* Sidebar or Top Nav */}
        <nav className="sidebar">
          <h2>Admin Panel</h2>
          <button onClick={() => setActiveTab("registerDoctor")}>➕ Register Doctor</button>
          <button onClick={() => setActiveTab("adminRequests")}>📥 Admin Requests</button>
          <button onClick={() => setActiveTab("users")}>👥 Users</button>
          <button onClick={() => setActiveTab("doctors")}>🧑‍⚕️ Doctors</button>
          <button onClick={() => setActiveTab("patients")}>🧑‍🦽 Patients</button>
          <button onClick={() => setActiveTab("assignPatient")}>🔁 Assign Patient</button>
        </nav>
        {/* Main Content */}
        <main className="dashboard-content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;