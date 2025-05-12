import React from 'react'
import '../../../css/home.css';
import Facilities from './Facilities';
import HeroSection from './HeroSection';
import OurDoctors from './OurDoctors.jsx';
import ContactUs from './ContactUs.jsx';
import Footer from './Footer.jsx';


export default function HomePage() {
  return (
    <div className='HomePage'>
      <HeroSection/>
      <Facilities/>
      <OurDoctors/>
      <ContactUs/>
      <Footer/>
    </div>
  )
}
