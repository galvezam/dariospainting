import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import DatePicker from "react-datepicker";

const EstimateDetailsPage = () => {
    const navigate = useNavigate();
    const { estimateId } = useParams();
    const [estimateDetails, setEstimateDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [userId, setUserId] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchDate = async () => {
            try {
                setIsLoading(true);

                const profile = await ApiService.getUserProfile();
                setUserProfile(profile);

                const response = await ApiService.getEstimateById(estimateId);
                setEstimateDetails(response.estimate);
                
                const userProfile = await ApiService.getUserProfile();
                setUserId(userProfile.user.id);
            }
            catch (error) {
                setError(error.response?.data?.message || error.message);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchDate();
    }, [estimateId]);

    const handleConfirmBooking = async () => {
        if (!startDate || !endDate) {
            setErrorMessage('Please select check-in and check-out dates.');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }

        const oneDay = 24 * 60 * 60 * 1000;
        const inDate = new Date(startDate);
        const outDate = new Date(endDate);
        const totalDays = Math.round(Math.abs((outDate - inDate) / oneDay)) + 1;

        // navigate('/confirmation', { state: { startDate, endDate, totalDays } });
    };

    const acceptBooking = async () => {
        try {
            
            const inDate = new Date(startDate);
            const outDate = new Date(endDate);

            console.log('Original start date: ', startDate);
            console.log('Original end date: ', endDate);

            const formattedStartDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            const formattedEndDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

            console.log('Formatted start date: ', formattedStartDate);
            console.log('Formatted end date: ', formattedEndDate);

            const booking = {
                startDate: formattedStartDate,
                endDate: formattedEndDate
            };

            console.log(booking);
            console.log(endDate);

            // const response = await ApiService.bookEstimate(estimateId, userId, booking);
            // if (response.statusCode === 200) {
            //     setConfirmationCode(response.bookingConfirmationCode);
            //     setShowMessage(true);

            //     setTimeout(() => {
            //         setShowMessage(false);
            //         navigate('/estimates');
            //     }, 10000);
            // }
            const response = await ApiService.bookEstimate(estimateId, userId, booking);
            if (response.statusCode === 200) {
                setConfirmationCode(response.bookingConfirmationCode);
                setShowMessage(true);

                // Send confirmation email
                await ApiService.sendConfirmationEmail(userProfile.user.email, response.bookingConfirmationCode);

                setTimeout(() => {
                    setShowMessage(false);
                    navigate('/estimates');
            }, 10000);
        }
        }
        catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    if (isLoading) {
        return <p className="estimate-detail-loading">Loading estimate details...</p>
    }

    if (error) {
        return <p className="estimate-detail-loading">{error}</p>
    }

    if (!estimateDetails) {
        return <p className="estimate-detail-loading">Estimate not found.</p>
    }

    const { estimateType, estimateAddress, estimatePhotoUrl, estimateDescription, bookings } = estimateDetails;

    return (
        <div className="estimate-detials-booking">
            {showMessage && (
                <p className="booking-success-message">
                    Booking successful! Confirmation Code: {confirmationCode}. An SMS and email of your booking details have been sent to you.
                </p>
            )}

            {errorMessage && (
                <p className="error-message">
                    {errorMessage}
                </p>
            )}
            <h2>Estimate Details</h2>
            <br />
            <img src={estimatePhotoUrl} alt={estimateType} className="estimate-details-image" />
            <div className = "estimate-details-info">
                <h3>{estimateType}</h3>
                <p>Address: {estimateAddress}</p>
                <p>{estimateDescription}</p>
            </div>
            {bookings && bookings.length > 0 && (
                <div>
                    <h3>Existing Booking Details</h3>
                    <ul className="booking-list">
                        {bookings.map((booking, index) => (
                            <li key={booking.id} className="booking-item">
                                <span className="booking-number">Booking {index + 1}</span>
                                <span className="booking-text">Start date: {booking.startDate}</span>
                                <span className="booking-text">End Date: {booking.endDate}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="booking-info">
                <button className="book-now-button" onClick={() => setShowDatePicker(true)}>Book Now</button>
                <button className="back-button" onClick={() => navigate('/estimates')}>Go Back</button>
                {showDatePicker && (
                    <div className="date-picker-container">
                        <DatePicker
                            className="detail-search-field"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Start Date"
                            dateFormat={"MM/dd/yyyy h:mm aa"}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="Time"
                            timeValueLabel="time"
                        />
                        <DatePicker
                            className="detail-search-field"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            placeholderText="End Date"
                            dateFormat={"MM/dd/yyyy h:mm aa"}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="Time"
                            timeValueLabel="time"
                        />
                        <div className="confirm-booking">
                            <button className="confirm-booking" onClick={handleConfirmBooking}>Confirm Booking</button>
                        </div>
                    </div>
                )}
                <div className="accept-booking">
                    <button className="accept-booking" onClick={acceptBooking}>Accept Booking</button>
                </div>
            </div>
        </div>
    );
};

export default EstimateDetailsPage;