import React from "react";
import PrivateRoute from "./ProtectedRoute/ProtectedRoute";
import PublicRoute from "./PublicRoute/PublicRoute";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "../Login/login";
// import Dashboard from "../Component/SuperAdmin/Dashboard /dashboard";
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "../Admin/dashboard/dashboard";
import ProjectsManagement from "../Admin/ProjectsManagement";
import Taskmangement from '../Admin/TaskManagement';
import UserManagement from '../Admin/UserManagement';

function Routepage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>

      


        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Outlet />}>
            <Route path="/" element={<Navigate replace to="dashboard" />} />
         
             <Route path="dashboard" element={<Dashboard />} />
             <Route path="ProjectsManagement" element={<ProjectsManagement />} />
             <Route path="TaskManagement" element={<Taskmangement />} />
             <Route path="UserManagement" element={<UserManagement />} />
             
          </Route>
        </Route>

       

      

      </Routes>
      <ToastContainer />
    </>
  );
}

export default Routepage;
