import React from 'react'
import hospitalBeds from '../../../images/hospital-beds.jpg'
import consulation from '../../../images/cosultation.jpeg'
import ambulance from '../../../images/emergencyS.jpeg'

export default function Facilities() {
  return (
    <div className='facilities-section' style={{maxWidth:"90%"}}>
        <section className="facilities-container">
      <h2 className="facilities-title">Our Facilities</h2>
      <div className="facilities-grid">
        <div className="facility-card">
          <img src={hospitalBeds} alt="Hospital Beds" />
          <h3>Advanced ICU</h3>
          <p>Equipped with modern life-supporting technology.</p>
        </div>
        <div className="facility-card">
          <img src={consulation} alt="Doctor Consultation" />
          <h3>24/7 Consultation</h3>
          <p>Specialists available round-the-clock.</p>
        </div>
        <div className="facility-card">
          <img src={ambulance} alt="Ambulance Service" />
          <h3>Emergency Services</h3>
          <p>Quick response ambulance with expert paramedics.</p>
        </div>
      </div>
    </section>
        </div>
  )
}
