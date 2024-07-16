package com.galvez.dariospainting.repository;

import com.galvez.dariospainting.model.Booking;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findByBookingConfirmationCode(String bookingConfirmationCode);

    @Query(value = ("SELECT b FROM bookings b WHERE b.estimate_id = :estimateId"), nativeQuery = true)
    Booking getBookingByEstimateId(Long estimateId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO bookings (booking_confirmation_code, booking_date_end, booking_date_start, estimate_id, user_id) VALUES (:confirmationCode, :bookingDateEnd, :bookingDateStart, :estimateID, :userID)", nativeQuery = true)
    void saveBookingInDatabase(String confirmationCode, LocalDateTime bookingDateEnd, LocalDateTime bookingDateStart, Long estimateID, Long userID);
}
