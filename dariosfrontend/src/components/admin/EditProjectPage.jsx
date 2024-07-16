import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const EditProjectPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [projectDetails, setProjectDetails] = useState({
        projectPhotoUrl: '',
        projectAddress: '',
        projectType: '',
        projectDescription: ''
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await ApiService.getProjectById(projectId);
                setProjectDetails({
                    projectPhotoUrl: response.project.projectPhotoUrl,
                    projectAddress: response.project.projectAddress,
                    projectType: response.project.projectType,
                    projectDescription: response.project.projectDescription
                });
            }
            catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchProjectDetails();
    }, [projectId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
        else {
            setFile(null);
            setPreview(null);
        }
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('projectAddress', projectDetails.projectAddress);
            formData.append('projectType', projectDetails.projectType);
            formData.append('projectDescription', projectDetails.projectDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.updateProject(projectId, formData);
            if (result.statusCode === 200) {
                setSuccess('Project updated successfully.')

                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-projects');
                }, 3000);
            }
        }
        catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Do you want to delete this estimate?')) {
            try {
                const result = await ApiService.deleteProject(projectId);
                if (result.statusCode === 200) {
                    setSuccess('Project deleted successfully.');
                    setTimeout(() => {
                        setSuccess('');
                        navigate('/admin/manage-projects');
                    }, 3000);
                }
            }
            catch (error) {
                setError(error.response?.data?.message || error.message);
                setTimeout(() => setError(''), 5000);
            }
        }
    };

    return (
        <div className="edit-estimate-container">
            <h2>Edit Estimate</h2>
            {error && <p className="error=message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="edit-estimate-form">
                <div className="form-group">
                    {preview ? (
                        <img src={preview} alt="Project Preview" className="estimate-photo-preview" />
                    ) : (
                        projectDetails.projectPhotoUrl && (
                            <img src={projectDetails.projectPhotoUrl} alt="Project" className="project-photo" />
                        )
                    )}
                    <input
                        type="file"
                        name="projectPhoto"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label>Project Address</label>
                    <input
                        input="text"
                        name="projectAddress"
                        value={projectDetails.projectAddress}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Project Type</label>
                    <input
                        input="text"
                        name="projectType"
                        value={projectDetails.projectType}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Project Description</label>
                    <textarea
                        name="projectDescription"
                        value={projectDetails.projectDescription}
                        onChange={handleChange}
                    />
                </div>
                <button className="update-button" onClick={handleUpdate}>Update Project</button>
                <button className="delete-button" onClick={handleDelete}>Delete Project</button>
            </div>
        </div>
    );
};

export default EditProjectPage;