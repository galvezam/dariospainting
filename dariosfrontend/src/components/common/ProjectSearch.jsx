import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.module.css';
import ApiService from "../../service/ApiService";

const ProjectSearch = ({ handleSearchResult }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [projectAddress, setProjectAddress] = useState('');
    const [projectType, setProjectType] = useState('');
    const [projectTypes, setProjectTypes] = useState([]);
    const [error, setError] = useState('');
    const [bookingDetails, setBookingDetails] = useState({}); // New state for booking details
    const [customProjectType, setCustomProjectType] = useState(''); // New state for custom project type
    const [newProjectType, setNewProjectType] = useState(''); // New state for new project type


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
        const fetchProjectTypes = async () => {
            try {
                const types = await ApiService.getProjectTypes();
                setProjectTypes(types);
            }
            catch (error) {
                console.error('Error fetching estimate types: ', error.message);
            }
        };
        fetchProjectTypes();
    }, []);
    

    /* method to show errors */
    const showError = (message, timeout = 5000) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, timeout);
    };

    const handleInternalSearch = async () => {
        if (!startDate || !projectType) {
            showError('Please enter values for all fields');
            return false;
        }
        try {
            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;

            const formData = new FormData();
            formData.append('projectDateStarted', startDate.toISOString());
            formData.append('projectDateFinished', endDate.toISOString());
            formData.append('projectAddress', projectAddress);
            formData.append('projectType', projectType);

            console.log(formData.get('projectDateStarted'));
            console.log(formData.get('projectDateFinished'));
            console.log(formData.get('projectAddress'));
            console.log(formData.get('projectType'));

            const response = await ApiService.getAvailableProjectsByDateAndType(formData);
            
            if (response != null) {
                if (response.length === 0) {
                    showError('Project is not currently available for this date range and selected type');
                    return;
                }
                handleSearchResult(response);
                setError('');
            }
            else {
                console.log("Error fetching projects: ", response);
            }
        }
        catch (error) {
            const errorMessage = error.response?.data?.message || 'Unknown error occurred';
            showError(errorMessage);
        }
    };

    const handleAddProjectType = () => {
        if (newProjectType.trim() === '') {
            showError('Please enter a valid project type');
            return;
        }
        setProjectTypes([...projectTypes, newProjectType]);
        setNewProjectType('');
    };

    const handleProjectTypeChange = (e) => {
        const selectedType = e.target.value;
        setProjectType(selectedType);
        if (selectedType !== 'Other') {
            setCustomProjectType('');
        }
    };

    const getFinalProjectType = () => {
        return projectType === 'Other' ? customProjectType : projectType;
    };


    return (
        <section>
            <div className="search-container">
                <div className="search-field">
                    <label>Start Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                            console.log("date start" + date);
                        }}
                        // dateFormat="MM/dd/yyyy hh:mm aa"
                        dateFormat="Pp"
                        placeholderText="Select a Date"
                        showTimeSelect
                        // timeIntervals={60}
                        required
                        // timeFormat="HH:mm"
                        // timeCaption="Time"
                        // timeValueLabel="time"
                        
                    />
                </div>
                <div className="search-field">
                    <label>End Date</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => {
                            setEndDate(date);
                            console.log("date finish" + date);
                        }}
                        dateFormat="Pp"
                        placeholderText="Select a Date"
                        showTimeSelect
                        timeIntervals={60}
                        required
                    />
                </div>

                <div className="search-field">
                    <label>Project Type</label>
                    <select value={projectType} onChange={handleProjectTypeChange}>
                        <option disabled value="">
                            Select Project Type
                        </option>
                        {projectTypes.map((projectType) => {
                            return (
                                <option key={projectType} value={projectType}>
                                    {projectType}
                                </option>
                            );
                        })}
                    </select>
                </div>
                {/* {projectType === 'Other' && (
                    <div className="search-field">
                        <label>Custom Project Type</label>
                        <input
                            type="text"
                            value={customProjectType}
                            onChange={(e) => setCustomProjectType(e.target.value)}
                            placeholder="Enter Custom Project Type"
                        />
                    </div>
                )} */}

                <div className="search-field">
                    <label>Project Address</label>
                    <input
                        value={projectAddress || ''}
                        onChange={(e) => setProjectAddress(e.target.value)}
                        placeholder="Enter Project Address"
                    />
                </div>
                </div>

                <div className="button-container">
                    <button className="home-search-button" onClick={handleInternalSearch}>
                        Search Projects
                    </button>
                </div>
            
            {error && <p className="error-message">{error}</p>}
        </section>
    );
};

export default ProjectSearch;