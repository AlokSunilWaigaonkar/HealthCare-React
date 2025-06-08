import React, { useEffect, useState } from "react";
import api from "../../../api";
import "./UserList.css"; // optional CSS


export default function UsersList() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = () => {
      api.get("/admin/getUsers").then((res) => setUsers(res.data.data));
    };
  
    const handleRemove = async (userId) => {
      const confirmDelete = window.confirm("Are you sure you want to remove this user?");
      if (!confirmDelete) return;
  
      try {
        await api.delete(`/admin/delete-user/${userId}`);
        alert("User removed successfully ✅");
        fetchUsers(); // refresh list
      } catch (error) {
        alert("Failed to remove user ❌");
      }
    };
  
    return (
      <div className="users-container">
        <h2>All Users</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Enabled</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.enabled ? "✅" : "❌"}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button className="remove-btn" onClick={() => handleRemove(user.id)}>
                    🗑 Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }