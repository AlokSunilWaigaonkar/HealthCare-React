import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "../../css/login.css";
import Navbar from "../MainPage/Navbar";

export default function Login() {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("error-box");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setemail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (email === "" || password === "") {
      setMessage("⚠️ Please fill all the fields");
      setErrorClass("error-box shake");
      setTimeout(() => setErrorClass("error-box"), 500);
      return;
    }
  
    setLoading(true);
    setMessage("");
  
    try {
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });
  
      const { role, accessToken, refreshToken, userId } = response.data.data;
  
      // ✅ Store both tokens
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("id", userId);
  
      setMessage("✅ Login successful! Redirecting...");
      setErrorClass("success-box");
  
      setTimeout(() => {
        if (role === "DOCTOR") {
          navigate("/doctorDashboard");
        } else if (role === "PATIENT") {
          navigate("/patientDashboard");
        } else if (role === "ADMIN") {
          navigate("/admindashboard");
        }
        else {
          setMessage("⚠️ Unauthorized Role");
        }
      }, 1000);
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "❌ Login failed due to an internal error.";
      setMessage(errMsg);
      setErrorClass("error-box shake");
      setTimeout(() => setErrorClass("error-box"), 500);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <>
      <Navbar />
      <div className="login">
        <div className="login-body">
          <div className="card login-card">
            <div className="card-body">
              <h1 className="login-title">Log In</h1>
              {message && <div className={errorClass}>{message}</div>}

              <form className="login-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  className="input-sec"
                  style={{ borderRadius: "5px" }}
                  onChange={handleInputChange}
                  value={email}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="input-sec"
                  style={{ borderRadius: "5px" }}
                  onChange={handleInputChange}
                  value={password}
                />

                <button
                  type="submit"
                  className="btn submit-button btn-outline-success m-4"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Submit"}
                </button>

                <p className="text-center mt-3">
                  Don’t have an account?{" "}
                  <a href="/signup" style={{ textDecoration: "underline" }}>
                    Sign up here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}