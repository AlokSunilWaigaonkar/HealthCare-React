import React from 'react'
import '../../../css/home.css';

export default function Card({Title,Img,Desc,Extra}) {
      return (
    <div className={`card-container  `}>
      <div className=" home-card card mb-3   " style={{maxWidth:"100%",maxHeight:"120rem"}}>
        { 
            Img!==""?
        <div className="row g-0 ">
            <div className="col-4 img-fluid ">
                <img src={Img} className=" rounded-2" alt=".."/>
            </div>
            <div className=" col-8  ">
            <div className="card-body">
                <h5 className="card-title text-center">{Title}</h5>
                <p className="card-text">{Desc}</p>
                {Extra!==""?<p>{Extra}</p>:<></>}
            </div>
            </div>
        </div>
        :
        <div className="row g-0">
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{Title}</h5>
                    <p className="card-text">{Desc}</p>
                </div>
                </div>
        </div>
        }
</div>
    </div>
  )
}
