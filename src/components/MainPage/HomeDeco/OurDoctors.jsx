import React from "react";
import Default from '../../../images/defaultImage.png' 

const doctors = [
  { name: "Dr. Aryan Mehta", specialty: "Cardiologist", img: Default },
  { name: "Dr. Priya Sharma", specialty: "Neurologist", img: Default },
  { name: "Dr. Rohan Desai", specialty: "Orthopedic", img: Default },
];

const OurDoctors = () => {
  return (
    <div className='facilities-section' style={{maxWidth:"90%"}}>
    <section className="doctors-section">
      <h2 className="doctors-title">Meet Our Expert Doctors</h2>
      <div className="doctors-container">
        {doctors.map((doctor, index) => (
          <div key={index} className="facility-card">
            <img src={doctor.img} alt={doctor.name} className="doctor-image" />
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-specialty">{doctor.specialty}</p>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default OurDoctors;