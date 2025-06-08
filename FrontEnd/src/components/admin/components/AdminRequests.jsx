// AdminRequests.jsx
import React, { useEffect, useState } from "react";
import api from "../../../api";

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get("/admin/pending-requests").then((res) => setRequests(res.data.data));
  }, []);

  const handleDecision = async (userId, approve) => {
    await api.post(`/admin/approve-admin?userId=${userId}&approve=${approve}`);
    alert(approve ? "Approved ✅" : "Rejected ❌");
  };

  return (
    <div>
      <h2>Pending Admin Requests</h2>
      {requests.map((user) => (
        <div key={user.id}>
          {user.email} - {user.fullName}
          <button onClick={() => handleDecision(user.id, true)}>Approve</button>
          <button onClick={() => handleDecision(user.id, false)}>Reject</button>
        </div>
      ))}
    </div>
  );
}