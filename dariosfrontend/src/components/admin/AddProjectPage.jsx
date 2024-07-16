import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import DatePicker from 'react-datepicker';


const AddProjectPage = () => {
    const navigate = useNavigate();
    const [projectDetails, setProjectDetails] = useState({
        projectPhotoUrl: null,
        projectAddress: '',
        projectType: '',
        projectDescription: '',
        projectDateStarted: new Date(),
        projectDateFinished: new Date(),
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [projectTypes, setProjectTypes] = useState([]);
    const [newProjectType, setNewProjectType] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [name, setName] = useState('');


    const [dateStarted, setDateStarted] = useState(new Date());
    const [dateFinished, setDateFinished] = useState(new Date());

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
        const fetchProjectType = async () => {
            try {
                const types = await ApiService.getProjectTypes();
                setProjectTypes(types);
            }
            catch (error) {
                console.error('Error fetching project types: ', error.message);
            }
        };
        fetchProjectType();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProjectDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleProjectTypeChange = (e) => {
        if (e.target.value === 'new') {
            setNewProjectType(true);
            setProjectDetails(prevState => ({ ...prevState, projectType: ''}));
        }
        else {
            setNewProjectType(false);
            setProjectDetails(prevState => ({ ...prevState, projectType: e.target.value}));
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const photoUrl = URL.createObjectURL(selectedFile);
            setFile(selectedFile);
            setPreview(photoUrl);
            setProjectDetails(prevState => ({
                ...prevState,
                projectPhotoUrl: photoUrl
            }));
        } else {
            setFile(null);
            setPreview(null);
            setProjectDetails(prevState => ({
                ...prevState,
                projectPhotoUrl: null
            }));
        }
    };

    const addProject = async () => {
        if (!projectDetails.projectType || !projectDetails.projectAddress) {
            setError('All project details must be provided.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!window.confirm('Do you want to add this project?')) {
            return;
        }

        try {

            // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // if (!emailPattern.test(email)) {
            //     setEmailError('Please enter a valid email address.');
            //     return;
            // } else {
            //     setEmailError('');
            // }
            const formData = new FormData();

            formData.append('projectAddress', projectDetails.projectAddress);
            formData.append('projectType', projectDetails.projectType);
            formData.append('projectDescription', projectDetails.projectDescription);
            formData.append('photo', file);
            formData.append('projectDateStarted', dateStarted.toISOString());
            formData.append('projectDateFinished', dateFinished.toISOString());

            
            // if (file) {
            //     formData.append('photo', file);
            // }

            console.log(formData);
            console.log(projectDetails);

            const result = await ApiService.addProject(formData);
            
            if (result.statusCode === 200) {
                setSuccess('Project added successfully.');
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
            <h2>Add New Project</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="edit-estimate-form">
                             

                <div className="form-group">
                    <label>Project Type</label>
                    <select value={projectDetails.projectType} onChange={handleProjectTypeChange}>
                        <option value="">Select an project type</option>
                        {projectTypes.map(type => (
                            <option key={type} value={type}>{type} </option>
                        ))}
                        <option value="new">Other (please specify)</option>
                    </select>
                    {newProjectType && (
                        <input
                            type="text"
                            name="projectType"
                            placeholder="Enter new project type"
                            value={projectDetails.projectType}
                            onChange={handleChange}
                            />
                    )}
                </div>

                <div className="form-group">
                <label htmlFor="dateTime">Date Started:</label>
                    <DatePicker
                        selected={dateStarted}
                        onChange={(date) => setDateStarted(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        required
                        // filterDate={filterDate} 
                        //filterTime={filterTime} 
                    />
                </div>


                <div className="form-group">
                <label htmlFor="dateTime">Date Finished:</label>
                    <DatePicker
                        selected={dateFinished}
                        onChange={(date) => setDateFinished(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        required
                        // filterDate={filterDate} 
                        //filterTime={filterTime} 
                    />
                </div>

                <div className="form-group">
                    <label>Project Address</label>
                    <input
                        type="text"
                        name="projectAddress"
                        value={projectDetails.projectAddress}
                        onChange={handleChange}
                        />
                </div>
                
                
                {/* <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {emailError && <p className="error-message">{emailError}</p>}
                </div> */}

                <div className="form-group">
                    <label>Project Photo</label>
                    {preview && (
                        <img src={preview} alt="Project Preview" className="estimate-photo-preview" />

                    )}
                    <input
                        type="file"
                        name="projectPhoto"
                        onChange={handleFileChange}
                        />

                </div>   

                <div className="form-group">
                    <label>Project Description (Optional)</label>
                    <textarea
                        name="projectDescription"
                        value={projectDetails.projectDescription}
                        onChange={handleChange}
                        ></textarea>
                </div>
                <button className="update-button" onClick={addProject}>Add Project</button>
            </div>
        </div>
    );
};

export default AddProjectPage;