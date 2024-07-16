import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";

import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import Homepage from "./components/home/Homepage";
import AllEstimatesPage from "./components/bookings_estimates/AllEstimatesPage";
import AllProjectsPage from "./components/bookings_estimates/AllProjectsPage";
import EditProjectPage from "./components/admin/EditProjectPage";
import AddProjectPage from "./components/admin/AddProjectPage";
import ManageProjectsPage from "./components/admin/ManageProjectsPage";
import EstimateDetailsPage from "./components/bookings_estimates/EstimateDetailsPage";
import FindBookingPage from "./components/bookings_estimates/FindBookingPage";
import AdminPage from "./components/admin/AdminPage";
import ManageEstimatesPage from "./components/admin/ManageEstimatesPage";
import EditEstimatePage from "./components/admin/EditEstimatePage";
import AddEstimatePage from "./components/admin/AddEstimatePage";
import AddBookingPage from "./components/admin/AddBookingPage";
import ManageBookingsPage from "./components/admin/ManageBookingsPage";
import EditBookingPage from "./components/admin/EditBookingPage";
import ProfilePage from "./components/profile/ProfilePage";
import EditProfilePage from "./components/profile/EditProfilePage";
import { ProtectedRoute, AdminRoute } from "./service/Guard";

import Login from "./components/admin/Login";


const FallbackRoute = () => {
  if (window.location.pathname === "/") {
    return <Homepage />;
  }
  return <Navigate to="/login" />;
};

function App() {

  return (
    <BrowserRouter>
        <div className="App">
          <Navbar />
            <div className="content">
              <Routes>

                {/* Public Routes */}
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/estimates" element={<AllEstimatesPage />} />
                <Route path="/find-booking" element={<FindBookingPage />} />
                <Route path="/user/add-estimate" element={<AddEstimatePage />} />
                <Route path="/user/add-booking" element={<AddBookingPage />} />
                <Route path="/projects" element={<AllProjectsPage />} />
                
                <Route exact path="/user/login" element={<Login/>}/>
                

                {/* Protected Routes */}
                <Route path="/estimate-details-book/:estimateId" element={<ProtectedRoute element ={<EstimateDetailsPage />} />} />
                <Route path="/profile" element={<ProtectedRoute element ={<ProfilePage />} />} />
                <Route path="/edit-profile" element={<ProtectedRoute element ={<EditProfilePage />} />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminRoute element ={<AdminPage />} />} />
                <Route path="/user/manage-estimates" element={<ProtectedRoute element ={<ManageEstimatesPage />} />} />
                <Route path="/admin/edit-estimate/:estimateId" element={<AdminRoute element ={<EditEstimatePage />} />} />
                {/* <Route path="/user/add-estimate" element={<ProtectedRoute element ={<AddEstimatePage />} />} /> */}
                {/* <Route path="/user/add-booking" element={<ProtectedRoute element ={<AddBookingPage />} />} /> */}
                <Route path="/user/manage-bookings" element={<ProtectedRoute element ={<ManageBookingsPage />} />} />
                <Route path="/admin/edit-booking/:bookingCode" element={<AdminRoute element ={<EditBookingPage />} />} />


                <Route path="/admin/edit-project/:projectId" element={<AdminRoute element ={<EditProjectPage />} />} />

                <Route path="/admin/manage-projects" element={<AdminRoute element ={<ManageProjectsPage />} />} />
                <Route path="/admin/add-project" element={<AdminRoute element ={<AddProjectPage />} />} />

                {/* Fallback Route */}
                <Route path="*" element={<FallbackRoute />} />

              </Routes>
            </div>
        </div>
    </BrowserRouter>
  );
};

export default App;