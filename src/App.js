
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Doctor/Login';
import DoctorDashBoard from './components/Doctor/DoctorDashBoard';
import Home from './components/MainPage/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctordashboard" element={<DoctorDashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
