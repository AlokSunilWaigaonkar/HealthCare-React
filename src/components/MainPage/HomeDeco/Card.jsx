import React from 'react'
import '../../../css/home.css';

export default function Card({Title,Img,Desc,Align}) {
console.log(Align)
  return (
    <div className={`card-container ${Align} `}>
      <div className=" home-card card mb-3   " style={{maxWidth:"90%",maxHeight:"120rem"}}>
        {
            Img!==""?
        <div className="row g-0">
            <div className="col-5 col-md-4 ">
                <img src={Img} className=" rounded-2" alt=".."/>
            </div>
            <div className="col-7 col-md-8  ">
            <div className="card-body">
                <h5 className="card-title">{Title}</h5>
                <p className="card-text">{Desc}</p>
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
