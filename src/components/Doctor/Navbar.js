import React, { useState,useEffect } from "react";
import "../../css/navbar.css";
import Logo from "../../images/logo.png";
import Data from "../../data"; // Importing the patient data
import PatientCard from "./PatientCard";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate=useNavigate();
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [submittedResults, setSubmittedResults] = useState([]); // Store results after submit

  

  // Handle input change & dynamic search
  const handleInputChange = (event) => {
    const searchQuery = event.target.value;
    setText(searchQuery);

    if (searchQuery.trim() === "") {
      setSearchResults([]); // Clear results when input is empty
      return;
    }

    const filteredResults = Data.filter((patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  //handle log out
  const handelLogOut=()=>{
    navigate("/")
  }

  // Handle form submission
  const handleOnSubmit = (event) => {
    event.preventDefault(); // Prevent page reload

    if (text.trim() === "") {
      setSubmittedResults([]); // Clear results if input is empty
      return;
    }

    const filteredResults = Data.filter((patient) =>
      patient.name.toLowerCase().includes(text.toLowerCase())
    );

    setSubmittedResults(filteredResults); // Store submitted search results
  };
  return (
    <div>
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="Logo" style={{ width: "80px" }} />
        </a>

        <form role="search" onSubmit={handleOnSubmit}>
          <input
            className="input-section"
            type="search"
            placeholder="Patient Name"
            aria-label="Search"
            value={text}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn nav-btn btn-outline-success m-4">Submit</button>
        </form>
        <button className="nav-btn btn btn-outline-success" onClick={handelLogOut} >Log out</button>
      </nav>

      {/* Display search results */}
      {text.trim() !== "" && (
  <div className="search-results">
    {searchResults.length > 0 ? (
      searchResults.map((patient, index) => (
        <PatientCard
          key={index}
          name={patient.name}
          contact={patient.contact}
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
