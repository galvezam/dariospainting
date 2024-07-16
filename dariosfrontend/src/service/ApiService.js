import axios from "axios";

export default class ApiService {

    static BASE_URL = "http://localhost:8080"

    static getHeader() {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found in localStorage");
        }
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
        // const token = localStorage.getItem("token");
        // return {
        //     Authorization: `Bearer ${token}`,
        //     "Content-Type": "application/json"
        // };
    };

    /* REGISTER A NEW USER */
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
        return response.data
    };

    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
        return response.data;
    };

    /* GET USERS */
    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        });
        return response.data;
    };

    // static async getUserProfile() {
    //     const response = await axios.get(`${this.BASE_URL}/users/profile`, {
    //         headers: this.getHeader()
    //     });
    //     return response.data;
    // };
    static async getUserProfile() {
        const headers = this.getHeader();
        console.log("Request Headers:", headers); // Log headers to check if token is being sent
        const response = await axios.get(`${this.BASE_URL}/users/profile`, {
            headers: headers
        }).catch(error => {
            console.error("Error fetching user profile:", error.response); // Log the error response
            throw error; // Re-throw the error after logging
        });
        return response.data;
    };

    /* SINGLE USER */
    static async getUser(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-id/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    };

    /* GET BOOKINGS BY USER ID */
    static async getUserBookings(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-bookings/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    };

    /* UPDATE USER PROFILE */
    static async updateUserProfile(user) {
        try {
            const headers = this.getHeader();
            console.log("Request Headers:", headers); // Log headers to check if token is being sent
            const response = await axios.put(`${this.BASE_URL}/users/edit-profile`, user, {
                headers: headers
            });
            return response.data;
        } catch (error) {
            console.error("Error updating user profile:", error.response); // Log the error response
            throw error; // Re-throw the error after logging
        }
        // const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
        // const response = await fetch('/users/profile', {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}` // Include the token in the request headers
        //     },
        //     body: JSON.stringify(user)
        // });

        // if (!response.ok) {
        //     throw new Error('Request failed with status ' + response.status);
        // }

        // return await response.json();

        // const headers = this.getHeader();
        // console.log("Request Headers:", headers); // Log headers to check if token is being sent
        // const response = await axios.put(`${this.BASE_URL}/users/edit-profile`, user, {
        //     headers: headers
        // }).catch(error => {
        //     console.error("Error updating user profile:", error.response); // Log the error response
        //     throw error; // Re-throw the error after logging
        // });
        // return response.data;
    };

    /* DELETE A USER */
    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    };


    /* All PROJECTS FROM DATABASE */
    static async getAllProjects() {
        const result = await axios.get(`${this.BASE_URL}/projects/all-projects`)
        return result.data;
    };


    /* ADDS NEW PROJECT TO DATABASE */
    static async addProject(formData) {
        const result = await axios.post(`${this.BASE_URL}/projects/add-project`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    };

    /* DELETE Project BY ID */
    static async deleteProject(projectId) {
        const result = await axios.delete(`${this.BASE_URL}/projects/delete/${projectId}`, {
            headers: this.getHeader()
        })
       return result.data;
    };
    
    /* UPDATES AN ESTIMATE */
    static async updateProject(projectId, formData) {
        const result = await axios.put(`${this.BASE_URL}/projects/update/${projectId}`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        })
        return result.data;
    };

    /* All PROJECTS BY ID */
    static async getProjectById(projectId) {
        const result = await axios.get(`${this.BASE_URL}/projects/project-id/${projectId}`)
        return result.data;
    };
    


    /* All PROJECT TYPES */
    static async getProjectTypes() {
        const response = await axios.get(`${this.BASE_URL}/projects/types`)
        return response.data;
    };


    /* GET PROJECTS WITHIN TIME FRAME, ADDRESS, MAYBE TYPE))) */
    // static async getAvailableProjectsByDateAndType(formData) {
    //     const result = await axios.get(
    //         `${this.BASE_URL}/projects/projects-by-date-and-type`, formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });
    //     return result.data;
    // };

            static async getAvailableProjectsByDateAndType(formData) {
                const params = new URLSearchParams();
                params.append('projectDateStarted', formData.get('projectDateStarted'));
                params.append('projectDateFinished', formData.get('projectDateFinished'));
                params.append('projectType', formData.get('projectType'));
                params.append('projectAddress', formData.get('projectAddress'));
                
                const result = await axios.get(`${this.BASE_URL}/projects/projects-by-date-and-type`, {
                    params: params
                });
                return result.data;
            }



    /* ADDS NEW ESTIMATE TO DATABASE */
    static async addEstimate(formData) {
        const result = await axios.post(`${this.BASE_URL}/estimates/add-estimate`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    };

    /* GET ALL AVAILABLE ESTIMATES */
    static async getAllAvailablEstimates() {
        const result = await axios.get(`${this.BASE_URL}/estimates/all-available-estimates`);
        return result.data;
    }

    /* GET ESTIMATES WITHIN TIME FRAME, ADDRESS, MAYBE TYPE))) */
    static async getAvailableEstimatesByDateAndAddress(startDate, endDate, estimateAddress, estimateType) {
        const result = await axios.get(
            `${this.BASE_URL}/estimates/available-estimates-date-address?startDate=${startDate}
            &endDate=${endDate}&estimateType=${estimateType}`
            // &estimateAddress=${estimateAddress}
        )
        return result.data;
    };

    /* All ESTIMATE TYPES */
    static async getEstimateTypes() {
        const response = await axios.get(`${this.BASE_URL}/estimates/types`)
        return response.data;
    };

    /* All ESTIMATES FROM DATABASE */
    static async getAllEstimates() {
        const result = await axios.get(`${this.BASE_URL}/estimates/all-estimates`)
        return result.data;
    };

    

    /* All ESTIMATES BY ID */
    static async getEstimateById(estimateId) {
        const result = await axios.get(`${this.BASE_URL}/estimates/estimate-id/${estimateId}`)
        return result.data;
    };

    /* DELETE ESTIMATE BY ID */
    static async deleteEstimate(estimateId) {
        const result = await axios.delete(`${this.BASE_URL}/estimates/delete/${estimateId}`, {
            headers: this.getHeader()
        })
        return result.data;
    };

    /* UPDATES AN ESTIMATE */
    static async updateEstimate(estimateId, formData) {
        const result = await axios.put(`${this.BASE_URL}/estimates/update/${estimateId}`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        })
        return result.data;
    };


    /* SAVES BOOKING TO DATABASE */
    static async bookEstimate(estimateId, userId, booking) {
        console.log("USER ID IS: " + userId);

        try {
            const response = await axios.post(`${this.BASE_URL}/bookings/book-estimate/${estimateId}/${userId}`, booking, {
                headers: this.getHeader()
            });
            return response.data;
        } catch (error) {
            console.error("Error booking estimate:", error.response ? error.response.data : error.message);
            throw error;
        }
    };

    /* GET All BOOKINGS */
    static async getAllBookings() {
        const result = await axios.get(`${this.BASE_URL}/bookings/all`, {
            headers: this.getHeader()
        })
        return result.data;
    };

    /* BOOKINGS BY CONFIRMATION CODE */
    static async getBookingByConfirmationCode(bookingCode) {
        const result = await axios.get(`${this.BASE_URL}/bookings/confirmation-code/${bookingCode}`)
        return result.data;
    };

    /* CANCEL USER BOOKING */
    static async cancelBooking(bookingId) {
        const result = await axios.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`, {
            headers: this.getHeader()
        })
        return result.data;
    };

    static async addBooking(formData) {

        try {
            const result = await axios.post(`${this.BASE_URL}/bookings/add-booking`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return result.data;
        } catch (error) {
            console.error("Error booking estimate:", error.response ? error.response.data : error.message);
            throw error;
        } 
    };

    static async sendConfirmationEmail(email, bookingConfirmationCode) {
        // try {
        //     const response = await fetch('/api/send-confirmation-email', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ email, confirmationCode })
        //     });
        //     if (!response.ok) {
        //         throw new Error('Failed to send confirmation email');
        //     }
        // } catch (error) {
        //     console.error('Error sending confirmation email:', error);
        // }
        const result = await axios.post(`${this.BASE_URL}/bookings/send-confirmation-email`, { email, bookingConfirmationCode })
        return result.data;
    };

    /* CREATE AND BOOK ESTIMATE */
    static async createAndBookEstimate(formData, userId, booking) {
        try {
            // Step 1: Create a new estimate
            const estimateResponse = await axios.post(`${this.BASE_URL}/estimates/add-estimate`, formData, {
                headers: {
                    ...this.getHeader(),
                    'Content-Type': 'multipart/form-data'
                }
            });
            const estimateId = estimateResponse.data.id; // Assuming the response contains the new estimate ID

            // Step 2: Book the newly created estimate
            const bookingResponse = await axios.post(`${this.BASE_URL}/bookings/book-estimate/${estimateId}/${userId}`, booking, {
                headers: this.getHeader()
            });

            return bookingResponse.data;
        } catch (error) {
            console.error("Error creating and booking estimate:", error.response ? error.response.data : error.message);
            throw error;
        }
    };

    

    /* AUTHENTICATION CHECK */
    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    };

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    };

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    };
}
