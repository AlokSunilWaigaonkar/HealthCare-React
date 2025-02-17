import React, { useState } from 'react'
import Card from './Card'
import HomeData from '../../../HomeData'
import '../../../css/home.css';

export default function HomePage() {
  const [homeData,setHomeData]=useState(HomeData)
  return (
    <div className='HomePage'>
      {homeData.map((data,index)=>(
        <Card key={index} Align={index % 2 === 0 ?`left` : `right`} Title={data.Title} Img={data.Image} Desc={data.Description} />
      ))}
    </div>
  )
}
