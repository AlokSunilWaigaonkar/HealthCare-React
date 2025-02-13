import React from 'react'
import Navbar from './Navbar'
import "../../css/dashBoard.css"
import bgImg from "/Users/alokwaigaonkar/health_care/src/images/background.jpeg"
import PatientList from './PatientList'

function DoctorDashBoard() {
  return (
    <>
    <img src={bgImg} alt="bg" className="bg-img" />
    <Navbar/>
    <PatientList/>
    </>
  )
}

export default DoctorDashBoard;
