import React, { useEffect, useState } from "react";
// import "../../css/navbar.css";
import Logo from "../../images/logo.png"; // Importing the patient data
import PatientCard from "./PatientCard";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function Navbar() {
  const navigate=useNavigate();
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [Data,setData] = useState({}); // store fetched patients
  let doctorId = localStorage.getItem("id");

  useEffect(()=>{
    const fetchPatients = async () => {
      try {
        const res = await api.get(`/doctor/${doctorId}/patients`);
        setData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
        setData([]);
      }
    };

    if (doctorId) {
      fetchPatients();
    }
  },[doctorId])

  const handleAppointmentClick = ()=>{
    navigate("/appointments")
}  

  // Handle input change & dynamic search
  const handleInputChange = (event) => {
    const searchQuery = event.target.value;
    setText(searchQuery);
  
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
  
    
  const filteredResults = Data.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });
  
    setSearchResults(filteredResults);
  };

  //handle log out
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', {
        refreshToken: localStorage.getItem("refreshToken")
      });
      console.log("loggin out" )
    } catch (error) {
      console.log("log out failed doing local logout")
      console.error("Logout failed", error);
    }
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };


 
  return (
    <div>
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="Logo" style={{ width: "80px" }} />
        </a>

        <form role="search" >
          <input
            className="input-section"
            type="search"
            placeholder="Patient Name"
            aria-label="Search"
            value={text}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn nav-btn btn-outline-success m-4">Search</button>
        </form>
        <div>
          <button className="nav-btn btn  btn-outline-success" onClick={handleAppointmentClick} >Appointments</button>
          <button className="nav-btn btn btn-outline-success" onClick={handleLogout} >Log out</button>
        </div>
      </nav>


      {text.trim() !== "" && (
  <div className="search-results">
    {searchResults.length > 0 ? (
      searchResults.map((patient, index) => (
        <PatientCard
          key={index}
          name={patient.firstName+" "+patient.lastName}
          contact={patient.contactNo}
          email={patient.email}
          gender={patient.gender}
        />
      ))
    ) : (
      <div className="mt-5 mx-5" style={{ color: "#5f6466" }}>
        <p>No Patient Found</p>
      </div>
    )}
  </div>
)}
    </div>
  );
}
