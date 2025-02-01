
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import DoctorDashBoard from './components/DoctorDashBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/doctordashboard" element={<DoctorDashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
