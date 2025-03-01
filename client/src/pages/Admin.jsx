import React, { useEffect, useState } from "react";
import axios from "axios";
import './Admin.css'

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", password: "" });

 
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const token = localStorage.getItem("token"); 
      const { data } = await axios.get("http://localhost:4000/api/users/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched Users:", data); 
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

const handleSave = async (id) => {
    try {
      console.log("Updating user with ID:", id, "with data:", editForm);
  
      await axios.put(`http://localhost:4000/api/users/update-user/${id}`, {
        name: editForm.name,
        email: editForm.email,
        password: editForm.password || undefined,
      });
  
      alert("User updated successfully!");
      setEditUserId(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err.response?.data || err);
      alert("Failed to update user");
    }
  };

  return (
    <div className="table-container">
      <h1 >Admin Panel - User List</h1>
      <table >
        <thead >
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password (Edit Only)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {editUserId === user._id ? (
                    <input type="text" name="name" placeholder="Edit name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })} />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editUserId === user._id ? (
                    <input type="text" name="email" placeholder="Edit email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })} />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editUserId === user._id ? (
                    <input type="password" name="password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })} placeholder="New password (optional)" />
                  ) : (
                    "********"
                  )}
                </td>
                <td>
                  {editUserId === user._id ? (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(user._id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditUserId(null)}>Cancel</button>
                    </>
                  ) : (
                    <button  onClick={() => {setEditUserId(user._id)

                    setEditForm({ name: user.name, email: user.email, password: "" });
                    
                    }
                }
                   
                    
                    >Edit</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
