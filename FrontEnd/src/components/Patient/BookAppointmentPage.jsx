import React from "react";
import BookAppointment from "./BookAppointment";

function BookAppointmentPage({id}) {
  return (
    <div className="min-h-screen bg-[#f5f8ff] p-6">
      <h1 className="text-3xl mt-4 font-bold mb-6 text-center">Book Appointment 📝</h1>
      <BookAppointment id={id}/>
    </div>
  );
}

export default BookAppointmentPage;
