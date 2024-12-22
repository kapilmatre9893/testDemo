import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();

  // Get user info from localStorage (mock login example)
  const userName = localStorage.getItem("RoleName") || "Guest";
  const roletype = localStorage.getItem("roletype") || "Guest";

  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  const handleLogout = () => {
    // Clear localStorage and redirect to login page
    localStorage.clear();
    localStorage.removeItem("RoleName");
    localStorage.removeItem("roletype");
    localStorage.removeItem("id");
    localStorage.removeItem("access_token");

    navigate("/");
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Role {roletype}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ProjectsManagement">
                Projects Management
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/TaskManagement">
                Task Management
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/UserManagement">
                User Management
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <span className="navbar-text me-3">
              Welcome, <strong>{userName}</strong>
            </span>
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={toggleDarkMode}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
