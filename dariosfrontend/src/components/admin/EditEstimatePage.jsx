import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const EditEstimatePage = () => {
    const { estimateId } = useParams();
    const navigate = useNavigate();
    const [estimateDetails, setEstimateDetails] = useState({
        estimatePhotoUrl: '',
        estimateAddress: '',
        estimateType: '',
        estimateDescription: ''
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchEstimateDetails = async () => {
            try {
                const response = await ApiService.getEstimateById(estimateId);
                setEstimateDetails({
                    estimatePhotoUrl: response.estimate.estimatePhotoUrl,
                    estimateAddress: response.estimate.estimateAddress,
                    estimateType: response.estimate.estimateType,
                    estimateDescription: response.estimate.estimateDescription
                });
            }
            catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchEstimateDetails();
    }, [estimateId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEstimateDetails(prevState => ({
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
            formData.append('estimateAddress', estimateDetails.estimateAddress);
            formData.append('estimateType', estimateDetails.estimateType);
            formData.append('estimateDescription', estimateDetails.estimateDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.updateEstimate(estimateId, formData);
            if (result.statusCode === 200) {
                setSuccess('Estimate updated successfully.')

                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-estimates');
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
                const result = await ApiService.deleteEstimate(estimateId);
                if (result.statusCode === 200) {
                    setSuccess('Estimate deleted successfully.');
                    setTimeout(() => {
                        setSuccess('');
                        navigate('/admin/manage-estimates');
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
                        <img src={preview} alt="Estimate Preview" className="estimate-photo-preview" />
                    ) : (
                        estimateDetails.estimatePhotoUrl && (
                            <img src={estimateDetails.estimatePhotoUrl} alt="Estimate" className="estimate-photo" />
                        )
                    )}
                    <input
                        type="file"
                        name="estimatePhoto"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label>Estimate Address</label>
                    <input
                        input="text"
                        name="estimateAddress"
                        value={estimateDetails.estimateAddress}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Estimate Type</label>
                    <input
                        input="text"
                        name="estimateType"
                        value={estimateDetails.estimateType}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Estimate Description</label>
                    <textarea
                        name="estimateDescription"
                        value={estimateDetails.estimateDescription}
                        onChange={handleChange}
                    />
                </div>
                <button className="update-button" onClick={handleUpdate}>Update Estimate</button>
                <button className="delete-button" onClick={handleDelete}>Delete Estimate</button>
            </div>
        </div>
    );
};

export default EditEstimatePage;