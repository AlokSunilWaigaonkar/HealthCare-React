import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setResponseMessage("⚠️ All fields are required!");
      return;
    }

    console.log("Form Submitted:", formData);
    setResponseMessage("✅ Your message has been sent!");

    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact-section">
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-subtitle">
        We are here to assist you. Feel free to reach out!
      </p>
      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="input-field"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="input-field textarea"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </div>
    </section>
  );
};

export default ContactUs;