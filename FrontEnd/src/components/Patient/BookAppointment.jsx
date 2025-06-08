import React, { useState, useEffect } from "react";
import "../../css/appointment.css" // Link to the appointment theme you applied
import api from "../../api";


function BookAppointment({id}) {



  const [doctors, setDoctors] = useState([]);
  const [expandedDoctorId, setExpandedDoctorId] = useState(null);
  const [formData, setFormData] = useState({ appointmentDate: "", reason: "" });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'


  useEffect(() => {
    api
      .get(`/patient/getDoctors/${id}`)
      .then((res) => setDoctors(res.data.data))
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setMessage("Failed to load doctors.");
        setMessageType("error");
      });
       // eslint-disable-next-line 
  }, []);



  const handleBookClick = (doctorId) => {
    setExpandedDoctorId(doctorId === expandedDoctorId ? null : doctorId);
    setFormData({ appointmentDate: "", reason: "" });
    setMessage("");
    setMessageType("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmBooking = async (doctorId) => {
    if (!formData.appointmentDate || !formData.reason) {
      setMessage("Please fill in both date/time and reason.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      await api.post(`/patient/book/${id}/${doctorId}`, formData);

      setMessage("Appointment booked successfully!");
      setMessageType("success");
      setExpandedDoctorId(null);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to book appointment.";
      setMessage(errorMsg);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mx-5 font-semibold mb-4">Available Doctors</h2>
      {/* Message box */}
      {message && (
        <div className={`message-box ${messageType}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="card">
            <div className="card-header">
              <div>
                <p className="name"> Dr.{doctor.firstName + " "+doctor.lastName} </p>
                <p className="specialization">{doctor.specialization}</p>
              </div>
              <button onClick={() => handleBookClick(doctor.id)}>
                {expandedDoctorId === doctor.id ? "Cancel" : "Book"}
              </button>
            </div>

            {expandedDoctorId === doctor.id && (
              <div className="form-section">
                <label>
                  Appointment Date & Time:
                  <input
                    type="datetime-local"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Reason:
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </label>
                <button
                  className="confirm-btn"
                  onClick={() => handleConfirmBooking(doctor.id)}
                  disabled={loading}
                >
                  {loading ? <span className="loader"></span> : "Confirm Booking"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookAppointment;
