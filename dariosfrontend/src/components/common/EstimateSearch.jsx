import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.module.css';
import ApiService from "../../service/ApiService";

const EstimateSearch = ({ handleSearchResult }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [estimateAddress, setEstimateAddress] = useState('');
    const [estimateType, setEstimateType] = useState('');
    const [estimateTypes, setEstimateTypes] = useState([]);
    const [error, setError] = useState('');

    const [userId, setUserId] = useState(''); // New state for user ID
    const [bookingDetails, setBookingDetails] = useState({}); // New state for booking details
    const [customEstimateType, setCustomEstimateType] = useState(''); // New state for custom estimate type
    const [newEstimateType, setNewEstimateType] = useState(''); // New state for new estimate type


    const filterDate = (date) => {
        const day = date.getDay();
        // Allow only weekdays (0 = Sunday, 6 = Saturday)
        return day !== 0;
    };

    const filterTime = (time) => {
        const hour = time.getHours();
        // Allow only times between 8 AM and 5 PM
        return hour >= 8 && hour <= 17;
    };



    useEffect(() => {
        const fetchEstimateTypes = async () => {
            try {
                const types = await ApiService.getEstimateTypes();
                setEstimateTypes(types);
            }
            catch (error) {
                console.error('Error fetching estimate types: ', error.message);
            }
        };
        fetchEstimateTypes();
    }, []);
    

    /* method to show errors */
    const showError = (message, timeout = 5000) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, timeout);
    };

    const handleInternalSearch = async () => {
        if (!startDate || !endDate || !estimateType || !estimateAddress) {
            showError('Please enter values for all fields');
            return false;
        }
        try {
            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;

            const response = await ApiService.getAvailableEstimatesByDateAndAddress(formattedStartDate, formattedEndDate, estimateAddress, estimateType);

            if (response.status === 200) {
                if (response.data.estimateList.length === 0) {
                    showError('Estimate is not currently available for this date range and selected type');
                    return;
                }
                handleSearchResult(response.data.estimateList);
                setError('');
            }
            else {
                console.log("Error fetching estimates: ", response);
            }
        }
        catch (error) {
            showError('Unknown error occurred: ' + error.response.data.message);
        }
    };

    const handleAddEstimateType = () => {
        if (newEstimateType.trim() === '') {
            showError('Please enter a valid estimate type');
            return;
        }
        setEstimateTypes([...estimateTypes, newEstimateType]);
        setNewEstimateType('');
    };

    const handleEstimateTypeChange = (e) => {
        const selectedType = e.target.value;
        setEstimateType(selectedType);
        if (selectedType !== 'Other') {
            setCustomEstimateType('');
        }
    };

    const getFinalEstimateType = () => {
        return estimateType === 'Other' ? customEstimateType : estimateType;
    };

    const handleCreateAndBook = async () => {
        if (!startDate || !estimateType || !estimateAddress) {
            showError('Please enter values for all fields');
            return false;
        }
        try {
            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;

            const formData = new FormData();
            formData.append('startDate', formattedStartDate);
            formData.append('endDate', formattedEndDate);
            formData.append('estimateAddress', estimateAddress);
            formData.append('estimateType', getFinalEstimateType());
            formData.append('bookingAddress', bookingDetails.address); // Add booking address

            const response = await ApiService.createAndBookEstimate(formData, userId, bookingDetails);

            if (response) {
                handleSearchResult(response);
                setError('');
            }
        }
        catch (error) {
            showError('Unknown error occurred: ' + error.response.data.message);
        }
    };

    return (
        <section>
            <div className="search-container">
                <div className="search-field">
                    <label>Start Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        // dateFormat="MM/dd/yyyy hh:mm aa"
                        dateFormat="Pp"
                        placeholderText="Select a Date"
                        showTimeSelect
                        timeIntervals={60}
                        // timeFormat="HH:mm"
                        // timeCaption="Time"
                        // timeValueLabel="time"
                        className="style-datepicker"
                        filterDate={filterDate} 
                        filterTime={filterTime} 
                    />
                </div>
                {/* <div className="search-field">
                    <label>End Date</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="MM/dd/yyyy hh:mm aa"
                        placeholderText="Select an End Date"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={60}
                        timeCaption="Time"
                        timeValueLabel="time"
                    />
                </div> */}

                <div className="search-field">
                    <label>Estimate Type</label>
                    <select value={estimateType} onChange={handleEstimateTypeChange}>
                        <option disabled value="">
                            Select Estimate Type
                        </option>
                        {estimateTypes.map((estimateType) => {
                            return (
                                <option key={estimateType} value={estimateType}>
                                    {estimateType}
                                </option>
                            );
                        })}
                    </select>
                </div>
                {estimateType === 'Other' && (
                    <div className="search-field">
                        <label>Custom Estimate Type</label>
                        <input
                            type="text"
                            value={customEstimateType}
                            onChange={(e) => setCustomEstimateType(e.target.value)}
                            placeholder="Enter Custom Estimate Type"
                        />
                    </div>
                )}

                {/* ADMIN ADD ESTIMATE */}
                {/* <div className="search-field">
                    <label>Add New Estimate Type</label>
                    <input
                        type="text"
                        value={newEstimateType}
                        onChange={(e) => setNewEstimateType(e.target.value)}
                        placeholder="Enter New Estimate Type"
                    />
                    <button onClick={handleAddEstimateType}>Add</button>
                </div> */}

                {/* USER ID CODE  */}
                {/* <div className="search-field">
                    <label>User ID</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter User ID"
                    />
                </div> */}

                {/* BOOKING DESCRIPTION */}
                {/* <div className="search-field">
                    <label>Booking Details</label>
                    <textarea
                        value={bookingDetails.details || ''}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, details: e.target.value })}
                        placeholder="Enter Booking Details"
                    />
                </div> */}
                <div className="search-field">
                    <label>Booking Address</label>
                    <input
                        value={bookingDetails.address || ''}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, address: e.target.value })}
                        placeholder="Enter Booking Address"
                    />
                </div>
                </div>

                <div className="button-container">
                    <button className="home-search-button" onClick={handleCreateAndBook}>
                        Search Estimates
                    </button>
                </div>
            
            {error && <p className="error-message">{error}</p>}
        </section>
    );
};

export default EstimateSearch;