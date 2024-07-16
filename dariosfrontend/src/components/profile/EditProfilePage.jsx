import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const EditProfilePage = () => {
    const [user, setUser] = useState({ name: '', email: '', phoneNumber: '' });
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
            }
            catch (error) {
                setError(error.message);
            }
        }
        fetchUserProfile();
    }, []);

    const validate = () => {
        const errors = {};
        if (!user.name) errors.name = "Name is required";
        if (!user.email) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(user.email)) errors.email = "Email is invalid";
        if (!user.phoneNumber) errors.phoneNumber = "Phone number is required";
        else if (!/^\d{10}$/.test(user.phoneNumber)) errors.phoneNumber = "Phone number is invalid";
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        try {
            console.log('Submitting user data:', user); // Log the user data being submitted
            const response = await ApiService.updateUserProfile(user);
            console.log('Response:', response); // Log the response from the server
            navigate('/profile');
        }
        catch (error) {
            console.error('Error:', error); // Log the error
            setError(error.message);
        }
    };


    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure you want to delete your account?')) {
            return;
        }
        try {
            await ApiService.deleteUser(user.id);
            navigate('/register');
        }
        catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="edit-profile-page">
            <h2>Edit Profile</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={user.name} onChange={handleChange} />
                    {formErrors.name && <p className="error-message">{formErrors.name}</p>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} />
                    {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
                    {formErrors.phoneNumber && <p className="error-message">{formErrors.phoneNumber}</p>}
                </div>
                <button type="submit">Save Changes</button>
            </form>
            <button className="delete-profile-button" onClick={handleDeleteProfile}>Delete Profile</button>
        </div>
        // <div className="edit-profile-page">
        //     <h2>Edit Profile</h2>
        //     {error && <p className="error-message">{error}</p>}
        //     {user && (
        //         <div className="profile-details">
        //             <p><strong>Name: </strong>{user.name}</p>
        //             <p><strong>Email: </strong>{user.email}</p>
        //             <p><strong>Phone Number: </strong>{user.phoneNumber}</p>
        //             <button className="delete-profile-button" onClick={handleDeleteProfile}>Delete Profile</button>
        //         </div>
        //     )}
        // </div>
    );
};

export default EditProfilePage;