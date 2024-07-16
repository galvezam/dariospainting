import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await ApiService.getAllBookings();
                const allBookings = response.bookingList;
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            }
            catch (error) {
                console.error('Error fetching bookings: ', error.message);
            }
        };
        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, bookings]);

    const filterBookings = (term) => {
        if (term === '') {
            setFilteredBookings(bookings);
        }
        else {
            const filtered = bookings.filter((booking) => 
                booking.bookingConfirmationCode && booking.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bookings-container">
            <h2>All Bookings</h2>
            <div className="search-div">
                <label>Filter by Booking Number:</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter booking number"
                />
            </div>
            <div className="booking-results">
                {currentBookings.map((booking) => {
                    <div key={booking.id} className="booking-result-item">
                        <p><strong>Booking Code:</strong>{booking.bookingConfirmationCode}</p>
                        <p><strong>Start Date:</strong>{booking.startDate}</p>
                        <p><strong>End Date:</strong>{booking.endDate}</p>
                        <button className="edit-estimate-button" onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}>
                            Manage Bookings
                        </button>
                    </div>
                })}
            </div>

            <Pagination
                estimatesPerPage={bookingsPerPage}
                totalEstimates={filteredBookings.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default ManageBookingsPage;