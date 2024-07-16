import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import DatePicker from 'react-datepicker';


const AddEstimatePage = () => {
    const navigate = useNavigate();
    const [estimateDetails, setEstimateDetails] = useState({
        estimatePhotoUrl: null,
        estimateAddress: '',
        estimateType: '',
        estimateDescription: '',
        estimatePhoneNumber: '',
        estimateDateTime: new Date(),
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [estimateTypes, setEstimateTypes] = useState([]);
    const [newEstimateType, setNewEstimateType] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [name, setName] = useState('');


    const [dateTime, setDateTime] = useState(new Date());
    const [phoneNumber, setPhoneNumber] = useState('');

    const filterDate = (date) => {
        const day = date.getDay();
        // Allow only weekdays (0 = Sunday, 6 = Saturday)
        return day !== 0;
    };

    const filterTime = (time) => {
        const hour = time.getHours();
        // Allow only times between 8 AM and 5 PM
        return hour >= 8 && hour <= 16;
    };


    useEffect(() => {
        const fetchEstimateType = async () => {
            try {
                const types = await ApiService.getEstimateTypes();
                setEstimateTypes(types);
            }
            catch (error) {
                console.error('Error fetching estimate types: ', error.message);
            }
        };
        fetchEstimateType();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEstimateDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEstimateTypeChange = (e) => {
        if (e.target.value === 'new') {
            setNewEstimateType(true);
            setEstimateDetails(prevState => ({ ...prevState, estimateType: ''}));
        }
        else {
            setNewEstimateType(false);
            setEstimateDetails(prevState => ({ ...prevState, estimateType: e.target.value}));
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const photoUrl = URL.createObjectURL(selectedFile);
            setFile(selectedFile);
            setPreview(photoUrl);
            setEstimateDetails(prevState => ({
                ...prevState,
                estimatePhotoUrl: photoUrl
            }));
        } else {
            setFile(null);
            setPreview(null);
            setEstimateDetails(prevState => ({
                ...prevState,
                estimatePhotoUrl: null
            }));
        }
    };

    const addEstimate = async () => {
        if (!estimateDetails.estimateType || !estimateDetails.estimateAddress) {
            setError('All estimate details must be provided.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!window.confirm('Do you want to add this estimate?')) {
            return;
        }

        try {

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                setEmailError('Please enter a valid email address.');
                return;
            } else {
                setEmailError('');
            }
            const formData = new FormData();

            formData.append('estimateAddress', estimateDetails.estimateAddress);
            formData.append('estimateType', estimateDetails.estimateType);
            formData.append('estimateDescription', estimateDetails.estimateDescription);
            formData.append('photo', file);
            formData.append('email', email);
            formData.append('name', name)


            formData.append('userPhoneNumber', phoneNumber);
            formData.append('bookingDateStart', dateTime.toISOString());
            
            // if (file) {
            //     formData.append('photo', file);
            // }

            console.log(formData);
            console.log(estimateDetails);

            const result = await ApiService.addEstimate(formData);
            
            if (result.statusCode === 200) {
                setSuccess('Estimate added successfully.');
                setTimeout(() => {
                    setSuccess('');
                    navigate('/');
                    // navigate('/user/login', { state: { estimateDetails } });
                }, 3000);
            }

        }
        catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }

    };


    return (
        <div className="edit-estimate-container">
            <h2>Add New Estimate</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="edit-estimate-form">
                             

                <div className="form-group">
                    <label>Estimate Type</label>
                    <select value={estimateDetails.estimateType} onChange={handleEstimateTypeChange}>
                        <option value="">Select an estimate type</option>
                        {estimateTypes.map(type => (
                            <option key={type} value={type}>{type} </option>
                        ))}
                        <option value="new">Other (please specify)</option>
                    </select>
                    {newEstimateType && (
                        <input
                            type="text"
                            name="estimateType"
                            placeholder="Enter new estimate type"
                            value={estimateDetails.estimateType}
                            onChange={handleChange}
                            />
                    )}
                </div>

                <div className="form-group">
                <label htmlFor="dateTime">Date and Time:</label>
                    <DatePicker
                        selected={dateTime}
                        onChange={(date) => setDateTime(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        required
                        filterDate={filterDate} 
                        filterTime={filterTime} 
                    />
                </div>

                <div className="form-group">
                    <label>Estimate Address</label>
                    <input
                        type="text"
                        name="estimateAddress"
                        value={estimateDetails.estimateAddress}
                        onChange={handleChange}
                        />
                </div>
                
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={estimateDetails.phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {emailError && <p className="error-message">{emailError}</p>}
                </div>

                <div className="form-group">
                    <label>Estimate Photo (Optional)</label>
                    {preview && (
                        <img src={preview} alt="Estimate Preview" className="estimate-photo-review" />

                    )}
                    <input
                        type="file"
                        name="estimatePhoto"
                        onChange={handleFileChange}
                        />

                </div>   

                <div className="form-group">
                    <label>Estimate Description (Optional)</label>
                    <textarea
                        name="estimateDescription"
                        value={estimateDetails.estimateDescription}
                        onChange={handleChange}
                        ></textarea>
                </div>
                <button className="update-button" onClick={addEstimate}>Add Estimate</button>
            </div>
        </div>
    );
};

export default AddEstimatePage;