import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import ManageBookingsPage from "../admin/ManageBookingsPage";
import ManageEstimatesPage from "../admin/ManageEstimatesPage";


const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user);
            }
            catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        ApiService.logout();
        navigate('/home');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="profile-page">
            {user && <h2>Welcome, {user.name}</h2>}
            <div className="profile-actions">
                <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {user && (
                <div className="profile-details">
                    <h3>My Profile Details</h3>
                    <p><strong>Email: </strong>{user.email}</p>
                    <p><strong>Phone Number: </strong>{user.phoneNumber}</p>
                </div>
            )}
            <div className="admin-page">
                <div className="admin-actions">
                    <button className="admin-button" onClick={() => navigate('/user/manage-estimates')}>
                        Manage Estimates
                    </button>
                    <button className="admin-button" onClick={() => navigate('/user/manage-bookings')}>
                        Manage Bookings
                    </button>
                </div>
            </div>

            <div className="bookings-section">
                <h3>My Booking History</h3>
                <div className="booking-list">
                    {user && user.bookings && user.bookings.length > 0 ? (
                        user.bookings.map((booking) => (
                            <div key={booking.id} className="booking-item">
                                <p><strong>Booking Code: </strong>{booking.bookingConfirmationCode}</p>
                                <p><strong>Start Date: </strong>{booking.startDate}</p>
                                <p><strong>End Date: </strong>{booking.endDate}</p>
                                <p><strong>Estimate Type: </strong>{booking.estimate.estimateType}</p>
                                <img src={booking.estimate.estimatePhotoUrl} alt="Estimate" className="estimate-photo" />
                            </div>
                        ))
                    ) : (
                        <p>No bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;