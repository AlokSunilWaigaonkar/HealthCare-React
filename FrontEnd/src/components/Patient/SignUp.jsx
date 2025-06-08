import React, { useState } from "react";
import Navbar from "../MainPage/Navbar";
import { useNavigate } from "react-router-dom";
import "../../css/signup.css";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("signup-message");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { firstName, lastName, email, password } = formData;
  
    if (!firstName || !lastName || !email || !password) {
      setMessage("⚠️ Please fill in all fields.");
      setErrorClass("signup-message shake");
      setTimeout(() => setErrorClass("signup-message"), 500);
      return;
    }
  
    setLoading(true); // Start loading
  
    try {
      const res = await axios.post(
        "http://localhost:8080/register/registerPatient",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (res.status === 200 || res.status === 201) {
        setMessage("✅ Sign Up Successful! Please check your email for verification.");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "❌ Error creating account. Try again.";
      setMessage(errorMsg);
      setErrorClass("signup-message shake");
      setTimeout(() => setErrorClass("signup-message"), 500);
    } finally {
      setLoading(false); // Stop loading in both success & error
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup">
        <div className="signup-body">
          <div className="card signup-card">
            <div className="card-body">
              <h2 className="signup-title">Patient Sign Up</h2>
              {message && <div className={errorClass}>{message}</div>}
              <form onSubmit={handleSubmit} className="signup-form">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="input-sec"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="input-sec"
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="input-sec"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  className="input-sec"
                  onChange={handleChange}
                />
                <button
  type="submit"
  className="btn sub-btn btn-outline-primary"
  disabled={loading}
>
  {loading ? (
    <>
      <span className="spinner"></span> Creating Account...
    </>
  ) : (
    "Create Account"
  )}
</button>
                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <a href="/login" style={{ textDecoration: "underline" }}>
                    Login here
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