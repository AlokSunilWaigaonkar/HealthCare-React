import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "/Users/alokwaigaonkar/health_care/src/images/background.jpeg";

export default function Login() {
    const navigate=useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage]=useState("")
    const handleInputChange=(event)=>{
        const {name,value}=event.target;
        if(name==="username"){
            setUserName(value);
            }
        if(name==="password"){
            setPassword(value);
        }
    }
    const validCredentials={
        username:"doc123",
        password:"doc@123"
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(userName ==="" || password ===""){
            setMessage("Please fill all the fields")
            return;
        }

        if(userName === validCredentials.username && password === validCredentials.password){
            setMessage("")
            alert("Login Successfull")
            setUserName("")
            setPassword("")
            navigate("/DoctorDashBoard"); 
        }else{
            setMessage("Invalid Username and Password")
        }

        
    }
  return (
    <>
      <div className="login">
        <img src={bgImg} alt="Login-bg" className="bg-img" />
        <div className="login-body">
          <div className="card login-card">
            <div className="card-body">
              <h1 className="login-title">Log In</h1>
              <form action="" className="login-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder="Doc Id "
                  className="m-3 p-2 px-3 input-section"
                  style={{ borderRadius: "5px" }}
                    onChange={handleInputChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Doc Key"
                  className="m-3 p-2 px-3 input-section"
                  style={{ borderRadius: "5px" }}
                  onChange={handleInputChange}
                />

                <button type="submit" className="btn submit-button m-4 " >
                  Submit
                </button>
                <div style={{height:"10px" , color:"red"}}>
                {message!=="" && <p>{message}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

