import React, { useState } from "react";
import Navbar from "../MainPage/Navbar";
import { useNavigate } from "react-router-dom";
import "../../css/signup.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    // ✅ DUMMY Signup logic:
    setMessage("✅ Sign Up Successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 2000);

    // 🧪 Uncomment below when backend is ready
    /*
    try {
      const res = await axios.post("http://localhost:8080/patient/signup", formData);
      if (res.status === 201 || res.status === 200) {
        setMessage("✅ Sign Up Successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setMessage("❌ Error creating account. Try again.");
    }
    */
  };

  return (
    <>
      <Navbar />
      <div className="signup">
        <div className="signup-body">
          <div className="card signup-card">
            <div className="card-body">
              <h2 className="signup-title">Patient Sign Up</h2>
              {message && <div className="signup-message">{message}</div>}
              <form onSubmit={handleSubmit} className="signup-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
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
                <button type="submit" className="btn sub-btn btn-outline-primary">
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}