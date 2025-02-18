import React from 'react'
import Navbar from './Navbar'
import Homebg from '../../images/homebG.png'
import HomePage from './HomeDeco/HomePage'

export default function Home() {
  return (
    <div>
        <img className='bg-img' src={Homebg} alt="" />
      <Navbar />
      <HomePage/>
    </div>
  )
}
