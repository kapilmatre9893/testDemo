import React, { useState } from "react";
import "./login.css";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Mock users
const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "Manager User",
    email: "manager@example.com",
    password: "manager123",
    role: "manager",
  },
  {
    id: 3,
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("admin"); // State for selected role
  const [welcomeText, setWelcomeText] = useState(""); // State for welcome message
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values) => {
    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (user && user.role === selectedRole) {
      localStorage.setItem("access_token", "mock_token");
      localStorage.setItem("id", user.id);
      localStorage.setItem("RoleName", user.name);
      localStorage.setItem("roletype", user.role);

      toast.success("Login successful!");

      // Redirect based on user role
      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "manager") {
        navigate("/dashboard");
      } else if (user.role === "user") {
        navigate("/dashboard");
      }
    } else {
      toast.error("Invalid email, password, or role!");
    }
  };

  // Update welcome message based on role selection
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    if (role === "admin") {
      setWelcomeText(" Admin!");
    } else if (role === "manager") {
      setWelcomeText(" Manager!");
    } else if (role === "user") {
      setWelcomeText(" User!");
    } else {
      setWelcomeText("");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-6">
              <div className="card-body p-0">
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    <div className="p-5 login-inner">
                      <div className="text-center">
                       
                       
                          <h1 className="h4 text-gray-900 mb-4">Welcome Back!  {welcomeText}</h1>
                          <p className="h4 text-gray-900 mb-0" >
  Email:{" "}
  {selectedRole === "admin"
    ? "admin@example.com"
    : selectedRole === "manager"
    ? "manager@example.com"
    : selectedRole === "user"
    ? "user@example.com"
    : "Select a role"}
</p>
                          <p className="h4 text-gray-900 mb-2">

  Password:{" "}
  {selectedRole === "admin"
    ? "admin123"
    : selectedRole === "manager"
    ? "manager123"
    : selectedRole === "user"
    ? "user123"
    : "Select a role"}
</p>
                    
                      </div>

                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                      >
                        <Form className="user">
                          <div className="form-group">
                            <Field
                              type="email"
                              name="email"
                              id="login_email"
                              className="form-control form-control-user"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address"
                            />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                          </div>

                          <div className="form-group">
                            <div className="eyes_input">
                              <Field
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                id="password"
                                name="password"
                                className="form-control form-control-user"
                              />
                              <span
                                className="password-toggle-icon"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                              </span>
                            </div>
                            <ErrorMessage name="password" component="div" className="text-danger" />
                          </div>

                          {/* Role Selection */}
                          <div className="form-group">
                            <div className="form-check">
                              <Field
                                type="radio"
                                name="role"
                                value="admin"
                                className="form-check-input"

                                checked={selectedRole === "admin"}
                                onChange={() => handleRoleChange("admin")}
                              />
                              <label className="form-check-label">Admin</label>
                            </div>
                            <div className="form-check">
                              <Field
                                type="radio"
                                name="role"
                                value="manager"
                                className="form-check-input"
                                checked={selectedRole === "manager"}
                                onChange={() => handleRoleChange("manager")}
                              />
                              <label className="form-check-label">Manager</label>
                            </div>
                            <div className="form-check">
                              <Field
                                type="radio"
                                name="role"
                                value="user"
                                className="form-check-input"
                                checked={selectedRole === "user"}
                                onChange={() => handleRoleChange("user")}
                              />
                              <label className="form-check-label">User</label>
                            </div>
                          </div>

                          <button
                            className="btn btn-primary btn-user btn-block"
                            type="submit"
                          >
                            Login
                          </button>
                        </Form>
                      </Formik>

                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
