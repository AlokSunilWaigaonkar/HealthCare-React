import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "/Users/alokwaigaonkar/health_care/src/images/background.jpeg";

export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUserName(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const validCredentials = {
    username: "doc123",
    password: "doc@123",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userName === "" || password === "") {
      setMessage("⚠️ Please fill all the fields");
      setErrorClass("error-box shake");
      setTimeout(() => setErrorClass("error-box"), 500); // Remove shake effect after animation
      return;
    }

    if (userName === validCredentials.username && password === validCredentials.password) {
      setMessage("");
      setIsLoggedIn(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/DoctorDashBoard");
      }, 2000);
    } else {
      setMessage("Invalid Username or Password");
      setErrorClass("error-box shake");
      setTimeout(() => setErrorClass("error-box"), 500);
    }
  };

  return (
    <>
      <div className="login">
        <img src={bgImg} alt="Login-bg" className="bg-img" />
        <div className="login-body">
          {isLoggedIn ? (
            // Success Screen
            <div className="success-screen">
              <b>Login Successful</b>
              <p>Redirecting...</p>
            </div>
          ) : (
            <div className="card login-card">
              <div className="card-body">
                <h1 className="login-title">Log In</h1>
                {message && <div className={errorClass}>{message}</div>}
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
                  <button type="submit" className="btn submit-button btn-outline-success m-4">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}