package com.galvez.dariospainting.service.servInterface;

import com.galvez.dariospainting.dto.Response;
import com.galvez.dariospainting.model.Booking;

import java.time.LocalDateTime;

public interface BookingServInterface {

    Response saveBooking(Long estimateId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);

    // Response saveBookingInDatabase(String confirmationCode, LocalDateTime bookingDateEnd, LocalDateTime bookingDateStart, Long estimateID, Long userID);
}
