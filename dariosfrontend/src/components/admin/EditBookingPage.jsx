import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const EditBookingPage = () => {
    const navigate = useNavigate();
    const { bookingCode } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await ApiService.getBookingByConfirmationCode(bookingCode);
                setBookingDetails(response.booking);
            }
            catch (error) {
                setError(error.message);
            }
        };

        fetchBookingDetails();
    }, [bookingCode]);

    const secureBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to secure this booking?')) {
            return;
        }
        try {
            const response = await ApiService.cancelBooking(bookingId);
            if (response.statusCode === 200) {
                setSuccessMessage("The booking was succesfully secured");
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/admin/manage-bookings');
                }, 3000);
            }
        }
        catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="find-booking-page">
            <h2>Booking Detail</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {bookingDetails && (
                <div className="booking-details">
                    <h3>Booking Details</h3>
                    <p>Confirmation Code: {bookingDetails.bookingConfirmationCode}</p>
                    <p>Start Date: {bookingDetails.startDate}</p>
                    <p>End Date: {bookingDetails.endDate}</p>
                    <p>Guest Email: {bookingDetails.guestEmail}</p>

                    <br />
                    <hr />
                    <br />
                    <h3>Booker Details</h3>
                    <div>
                        <p>Name: {bookingDetails.user.name}</p>
                        <p>Email: {bookingDetails.user.email}</p>
                        <p>Phone Number: {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <h3>Estimate Details</h3>
                    <div>
                        <p>Estimate Address: {bookingDetails.estimate.estimateAddress}</p>
                        <p>Estimate Type: {bookingDetails.estimate.estimateType}</p>
                        <p>Estimate Description: {bookingDetails.estimate.estimateDescription}</p>
                        <img src={bookingDetails.estimate.estimatePhotoUrl} alt="" sizes="" srcSet="" />
                    </div>
                    <button className="secure-booking" onClick={() => secureBooking(bookingDetails.id)}>
                        Secure Booking
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditBookingPage;