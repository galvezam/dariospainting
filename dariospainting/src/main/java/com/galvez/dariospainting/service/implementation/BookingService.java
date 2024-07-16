package com.galvez.dariospainting.service.implementation;

import com.galvez.dariospainting.dto.BookingDto;
import com.galvez.dariospainting.dto.Response;
import com.galvez.dariospainting.exception.OurException;
import com.galvez.dariospainting.model.Booking;
import com.galvez.dariospainting.model.Estimate;
import com.galvez.dariospainting.model.Project;
import com.galvez.dariospainting.model.User;
import com.galvez.dariospainting.repository.BookingRepository;
import com.galvez.dariospainting.repository.EstimateRepository;
import com.galvez.dariospainting.repository.ProjectRepository;
import com.galvez.dariospainting.repository.UserRepository;
import com.galvez.dariospainting.service.servInterface.BookingServInterface;
import com.galvez.dariospainting.service.servInterface.EstimateServInterface;
import com.galvez.dariospainting.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService implements BookingServInterface {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EstimateServInterface estimateService;

    @Autowired
    private EstimateRepository estimateRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Response saveBooking(Long estimateId, Long userId, Booking bookingRequest) {
        Response response = new Response();

        try {
            // if (bookingRequest.getBookingDateEnd().isBefore(bookingRequest.getBookingDateStart())) {
            //     throw new IllegalArgumentException("Booking start hour must come after end hour");
            // }
            Estimate estimate = estimateRepository.findById(estimateId).orElseThrow(() -> new OurException("Estimate Not Found"));
            User user = userRepository.findById(userId).orElseThrow(() -> new OurException("User Not Found"));
            // Project project = projectRepository.findById(projectId).orElseThrow(() -> new OurException("Project not found"));

            List<Booking> existingBookings = estimate.getBookings();

            // if (!estimateIsAvailable(bookingRequest, existingBookings)) {
            //     throw new OurException("Estimate not available for selected date range");
            // }

            bookingRequest.setEstimate(estimate);
            bookingRequest.setUser(user);
            String bookingConfirmationCode = Utils.generateRandomConfirmationCode(10);
            bookingRequest.setBookingConfirmationCode(bookingConfirmationCode);
            bookingRepository.saveBookingInDatabase(bookingRequest.getBookingConfirmationCode(), null, bookingRequest.getBookingDateStart(), estimate.getId(), user.getId());

            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setBookingConfirmationCode(bookingConfirmationCode);
        }
        catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a booking: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response findBookingByConfirmationCode(String confirmationCode) {
        Response response = new Response();

        try {
            Booking booking = bookingRepository.findByBookingConfirmationCode(confirmationCode).orElseThrow(() -> new OurException("Booking Not Found"));
            BookingDto bookingDto = Utils.mapBookingEntityToBookingDtoPLUSBookedEstimates(booking, true);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setBooking(bookingDto);
        }
        catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error finding a booking: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllBookings() {
        Response response = new Response();

        try {
            List<Booking> bookingList = bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<BookingDto> bookingDtoList = Utils.mapBookingListEntityToBookingListDto(bookingList);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setBookingList(bookingDtoList);
        }
        catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting all bookings: " + e.getMessage());
            System.err.println("Exception: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response cancelBooking(Long bookingId) {
        Response response = new Response();

        try {
            bookingRepository.findById(bookingId).orElseThrow(() -> new OurException("Booking does not exist"));
            bookingRepository.deleteById(bookingId);
            response.setStatusCode(200);
            response.setMessage("Successful");
        }
        catch(OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error cancelling a booking: " + e.getMessage());
        }
        return response;
    }

    // private boolean estimateIsAvailable(Booking bookingRequest, List<Booking> existingBookings) {
    //     return existingBookings.stream()
    //             .noneMatch(existingBooking -> bookingRequest.getBookingDateStart().equals(existingBooking.getBookingDateStart())
    //             || bookingRequest.getBookingDateEnd().isBefore(existingBooking.getBookingDateEnd())
    //             || (bookingRequest.getBookingDateStart().isAfter(existingBooking.getBookingDateStart())
    //             && bookingRequest.getBookingDateStart().isBefore(existingBooking.getBookingDateEnd()))
    //             || (bookingRequest.getBookingDateStart().isBefore(existingBooking.getBookingDateStart())

    //             && bookingRequest.getBookingDateEnd().equals(existingBooking.getBookingDateEnd()))
    //             || (bookingRequest.getBookingDateStart().isBefore(existingBooking.getBookingDateStart())

    //             && bookingRequest.getBookingDateEnd().equals(existingBooking.getBookingDateEnd()))

    //             || (bookingRequest.getBookingDateStart().isAfter(existingBooking.getBookingDateEnd())
    //             && bookingRequest.getBookingDateEnd().equals(existingBooking.getBookingDateStart()))

    //             || (bookingRequest.getBookingDateStart().equals(existingBooking.getBookingDateEnd())
    //             && bookingRequest.getBookingDateEnd().equals(bookingRequest.getBookingDateStart()))
    //             );


    // }
}
