
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Doctor/Login';
import DoctorDashBoard from './components/Doctor/DoctorDashBoard';
import Home from './components/MainPage/Home';
import SignUp from './components/Patient/SignUp';
import PatientDashboard from './components/Patient/PatientDashboard';
import PatientRecord from './components/Doctor/PatientRecord';
import PatientProfile from './components/Patient/PatientProfile';
import UpdateProfile from './components/Patient/UpdateProfile';
import BookAppointmentPage from './components/Patient/BookAppointmentPage';
import Appointments from './components/Doctor/Appointments';
import ProtectedRoute from "./components/ProtectedRoute"
import AdminDashboard from './components/admin/components/AdminDashboard';

function App() {
  return (
    <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path="/doctordashboard"
        element={
          <ProtectedRoute>
            <DoctorDashBoard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admindashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/updateProfile"
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patientProfile"
        element={
          <ProtectedRoute>
            <PatientProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookAppointment"
        element={
          <ProtectedRoute>
            <BookAppointmentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patientDashBoard"
        element={
          <ProtectedRoute>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patientRecord"
        element={
          <ProtectedRoute>
            <PatientRecord />
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
  );
}

export default App;
