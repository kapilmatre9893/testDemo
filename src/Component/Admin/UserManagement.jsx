import React, { useState } from "react";
import Navbar from "./Navbar";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Manager" },
    { id: 3, name: "Charlie Davis", email: "charlie@example.com", role: "User" },
  ]);

  const [formValues, setFormValues] = useState({ id: null, name: "", email: "", role: "User" });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddOrUpdateUser = () => {
    if (isEditing) {
      setUsers(users.map((user) => (user.id === formValues.id ? formValues : user)));
    } else {
      setUsers([...users, { ...formValues, id: users.length + 1 }]);
    }
    resetForm();
  };

  const handleEditUser = (user) => {
    setFormValues(user);
    setIsEditing(true);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const resetForm = () => {
    setFormValues({ id: null, name: "", email: "", role: "User" });
    setIsEditing(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredUsers.length / itemsPerPage)));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">User Management</h2>

    

        {/* User List */}
        <div className="row">
        <div className="col-md-8">  <div className="mb-4">
            {/* Search Bar */}
            <div className="mb-3">
          <input
            type="text"
            placeholder="Search users by name or email"
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
          />
        </div>
          {paginatedUsers.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => handleEditUser(user)} className="btn btn-warning btn-sm me-2">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger btn-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between">
          <button onClick={goToPreviousPage} className="btn btn-secondary" disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(filteredUsers.length / itemsPerPage)}
          </span>
          <button onClick={goToNextPage} className="btn btn-secondary" disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}>
            Next
          </button>
        </div></div>
      
<div className="col-md-4"> <div className="mt-0">
          <h4>{isEditing ? "Edit User" : "Add New User"}</h4>
          <form>
            <div className="mb-3">
              <label>Name</label>
              <input type="text" name="name" value={formValues.name} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" name="email" value={formValues.email} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label>Role</label>
              <select name="role" value={formValues.role} onChange={handleChange} className="form-control">
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>
            </div>
            <button type="button" className={`btn ${isEditing ? "btn-primary" : "btn-success"} w-100`} onClick={handleAddOrUpdateUser}>
              {isEditing ? "Update User" : "Add User"}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-secondary mt-2 w-100" onClick={resetForm}>
                Cancel
              </button>
            )}
          </form>
        </div></div>
        {/* Add/Edit Form */}
       
</div>
      </div>
    </>
  );
};

export default UserManagement;
