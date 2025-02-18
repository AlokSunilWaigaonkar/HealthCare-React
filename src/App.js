
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Doctor/Login';
import DoctorDashBoard from './components/Doctor/DoctorDashBoard';
import Home from './components/MainPage/Home';
import SignUp from './components/Patient/SignUp';
import PatientDashboard from './components/Patient/PatientDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctordashboard" element={<DoctorDashBoard />} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path ='/patientDashBoard' element={<PatientDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
