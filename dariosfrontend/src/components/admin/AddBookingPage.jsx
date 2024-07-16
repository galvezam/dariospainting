import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import ApiService from '../../service/ApiService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddBookingPage = () => {
    //const { authState } = useOktaAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const estimateDetails = location.state?.estimateDetails || {};
    const [dateTime, setDateTime] = useState(new Date());
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    // const [email, setEmail] = useState(authState?.idToken?.claims?.email || ''); // Use authenticated user's email
    const [email, setEmail] = useState('');
    const [details, setDetails] = useState('');
    const [success, setSuccess] = useState('');
    const [file, setFile] = useState(null);
    const [emailError, setEmailError] = useState('');

    const urlToFile = async (url, filename, mimeType) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename, { type: mimeType });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        } else {
            setEmailError('');
        }

        try {
            if (estimateDetails.estimatePhotoUrl) {
                const photoFile = await urlToFile(estimateDetails.estimatePhotoUrl, estimateDetails.estimatePhotoUrl + '.jpg', 'image/jpeg');
                setFile(photoFile);
            }

            const formData = new FormData();
            formData.append('photo', file);
            formData.append('estimateType', estimateDetails.estimateType);
            formData.append('estimateAddress', estimateDetails.estimateAddress);
            formData.append('estimateDescription', estimateDetails.estimateDescription);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('userPhoneNumber', estimateDetails.estimatePhoneNumber);
            formData.append('description', estimateDetails.estimateDescription);
            formData.append('bookingDateStart', estimateDetails.estimateDateTime.toISOString());

            const response = await ApiService.addBooking(formData);
            console.log('Booking added successfully:', response);

            if (response.statusCode === 200) {
                setSuccess('Booking added successfully.');
                setTimeout(() => {
                    setSuccess('');
                    navigate('/home');
                }, 3000);
            }
        } catch (error) {
            console.error('Error adding booking:', error);
        }
    };

    return (
        <div style={{ padding: '30px', margin: '80px', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <h1>Add Booking</h1>
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="search-field">
                    <label htmlFor="Name">Name:</label>
                    <input
                        type="text"
                        id="Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="search-field">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="search-field">
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
                <div className="search-field">
                    <label htmlFor="details">Extra Details:</label>
                    <textarea
                        id="details"
                        value={details}
                        style={{ width: '800px', height: '200px' }}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddBookingPage;


// import React, { useState } from 'react';
// import ApiService from '../../service/ApiService';
// import { useNavigate, useLocation } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useOktaAuth } from '@okta/okta-react';


// const AddBookingPage = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const estimateDetails = location.state?.estimateDetails || {};
//     //const [time, setTime] = useState('');
//     const [dateTime, setDateTime] = useState(new Date());
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     //const [estimateId, setEstimateId] = useState('');
//     //const [userId, setUserId] = useState('');
//     const [email, setEmail] = useState(''); // Add state for email
//     const [details, setDetails] = useState('');
//     const [success, setSuccess] = useState('');
//     const [file, setFile] = useState(null);
//     const [emailError, setEmailError] = useState(''); // Add state for email error


//     const urlToFile = async (url, filename, mimeType) => {
//         const response = await fetch(url);
//         const blob = await response.blob();
//         return new File([blob], filename, { type: mimeType });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailPattern.test(email)) {
//             setEmailError('Please enter a valid email address.');
//             return;
//         } else {
//             setEmailError('');
//         }

        
//         //const bookingData = { firstName, lastName, time: dateTime, phoneNumber, details };

//         try {

//             if (estimateDetails.estimatePhotoUrl) {
//                 const photoFile = await urlToFile(estimateDetails.estimatePhotoUrl, estimateDetails.estimatePhotoUrl + '.jpg', 'image/jpeg');
//                 setFile(photoFile);
//             }
            
//             const formData = new FormData();
//             // formData.append('photo', estimateDetails.estimatePhotoUrl);
//             formData.append('photo', file);
//             formData.append('estimateType', estimateDetails.estimateType);
//             formData.append('estimateAddress', estimateDetails.estimateAddress);
//             formData.append('estimateDescription', estimateDetails.estimateDescription);
//             formData.append('firstName', firstName);
//             formData.append('lastName', lastName);
//             formData.append('email', email);
//             formData.append('userPhoneNumber', phoneNumber);
//             formData.append('description', details);
//             formData.append('bookingDateStart', dateTime.toISOString());
//             console.log(formData);

//             const bookingData = {
//                 photo: file,
//                 estimateType: estimateDetails.estimateType,
//                 estimateAddress: estimateDetails.estimateAddress,
//                 estimateDescription: estimateDetails.estimateDescription,
//                 firstName: firstName,
//                 lastName: lastName,
//                 bookingDateStart: dateTime.toISOString(),
//                 userPhoneNumber: phoneNumber,
//                 description: details
//             };
//             console.log('Booking Data:', bookingData); // Log the booking data

//             const response = await ApiService.addBooking(formData);
//             console.log('Booking added successfully:', response);

//             if (response.statusCode === 200) {
//                 setSuccess('Booking added successfully.');
//                 setTimeout(() => {
//                     setSuccess('');
//                     navigate('/home');
//                 }, 3000);
//             }
//         } catch (error) {
//             console.error('Error adding booking:', error);
//         }
//     };

//     return (
//         <div style={{padding: '30px', margin: '80px', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
//             <h1 >Add Booking</h1>
//             {success && <p className="success-message">{success}</p>}
//             <form onSubmit={handleSubmit}>

//                 <div className="search-field">
//                     <label htmlFor="Name">Name:</label>
//                     <input
//                         type="text"
//                         id="Name"
//                         value={firstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="search-field">
//                     <label htmlFor="lastName">Last Name:</label>
//                     <input
//                         type="text"
//                         id="lastName"
//                         value={lastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="search-field">
//                     <label htmlFor="email">Email:</label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     {emailError && <p className="error-message">{emailError}</p>}
//                 </div>

//                 {/* <div className="search-field">
//                 <label htmlFor="dateTime">Date and Time:</label>
//                     <DatePicker
//                         selected={dateTime}
//                         onChange={(date) => setDateTime(date)}
//                         showTimeSelect
//                         dateFormat="Pp"
//                         required
//                     />
//                 </div>
//                 <div className="search-field">
//                     <label htmlFor="phoneNumber">Phone Number:</label>
//                     <input
//                         type="tel"
//                         id="phoneNumber"
//                         value={phoneNumber}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         required
//                     />
//                 </div> */}
//                 <div className="search-field">
//                     <label htmlFor="details">Extra Details:</label>
//                     <textarea
//                         id="details"
//                         value={details}
//                         style={{ width: '800px', height: '200px' }}
//                         onChange={(e) => setDetails(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default AddBookingPage;
