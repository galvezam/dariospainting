package com.galvez.dariospainting.controller;

import com.galvez.dariospainting.dto.BookingDto;
import com.galvez.dariospainting.dto.EstimateDto;
import com.galvez.dariospainting.dto.Response;
import com.galvez.dariospainting.dto.UserDto;
import com.galvez.dariospainting.model.Booking;
import com.galvez.dariospainting.model.Estimate;
import com.galvez.dariospainting.model.Project;
import com.galvez.dariospainting.model.User;
import com.galvez.dariospainting.service.implementation.ProjectService;
import com.galvez.dariospainting.service.servInterface.BookingServInterface;
import com.galvez.dariospainting.service.servInterface.EstimateServInterface;
import com.galvez.dariospainting.service.servInterface.UserServInterface;
import com.galvez.dariospainting.utils.Utils;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingServInterface bookingService;

    @Autowired
    private UserServInterface userService;

    @Autowired
    private EstimateServInterface estimateService;

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private ProjectService projectService;

    @PostMapping("/book-estimate/{estimateId}/{userId}")
    public ResponseEntity<Response> saveBookings(@PathVariable Long estimateId,
                                                 @PathVariable Long userId,
                                                 @RequestBody Booking bookingRequest) {

        // if (bookingRequest.getBookingDateEnd() == null) {
        //     Response response = new Response();
        //     response.setMessage("Booking date end is required");
        //     response.setStatusCode(HttpStatus.BAD_REQUEST.value());
        //     return ResponseEntity.badRequest().body(response);
        // }

        try {
            Response response = bookingService.saveBooking(estimateId, userId, bookingRequest);
            return ResponseEntity.status(response.getStatusCode()).body(response);
            // Save booking logic
        } 
        catch (Exception e) {
            Response response = new Response();
            response.setMessage("Error saving a booking: " + e.getMessage());
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllBookings() {
        Response response = bookingService.getAllBookings();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/confirmation-code/{confirmationCode}")
    public ResponseEntity<Response> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        Response response = bookingService.findBookingByConfirmationCode(confirmationCode);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/cancel/{bookingId}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Response> cancelBooking(@PathVariable Long bookingId) {
        Response response = bookingService.cancelBooking(bookingId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/add-booking")
    public ResponseEntity<Response> addBooking(@RequestParam(value = "photo", required = false) MultipartFile photo,
                                            @RequestParam(value = "estimateType", required = false) String estimateType,
                                            @RequestParam(value = "estimateAddress", required = false) String estimateAddress,
                                            @RequestParam(value = "estimateDescription", required = false) String estimateDescription,
                                            @RequestParam(value = "email", required = false) String email,
                                            @RequestParam(value = "firstName", required = false) String firstName,
                                            @RequestParam(value = "lastName", required = false) String lastName,
                                            @RequestParam(value = "bookingDateStart", required = false) String bookingDateStart,
                                            @RequestParam(value = "userPhoneNumber", required = false) String userPhoneNumber,
                                            @RequestParam(value = "description", required = false) String description) {
        try {

            System.out.println("Received booking request with parameters:");
            System.out.println("estimateType: " + estimateType);
            System.out.println("estimateAddress: " + estimateAddress);
            System.out.println("estimateDescription: " + estimateDescription);
            System.out.println("firstName: " + firstName);
            System.out.println("lastName: " + lastName);
            System.out.println("bookingDateStart: " + bookingDateStart);
            System.out.println("userPhoneNumber: " + userPhoneNumber);
            System.out.println("description: " + description);
            System.out.println();
            Estimate estimate = estimateService.getEstimateByTypeAndAddressAndDescription(estimateType, estimateAddress, estimateDescription);
            System.out.println("estimate: " + estimate);
            // Fetch the user by ID
            Response userResponse = userService.getUserByPhoneNumberAndEmail(userPhoneNumber, email);
            User user;
            UserDto userDto;
            if (userResponse.getStatusCode() != 200) {
                // If user does not exist, create a new one
                user = new User();
                // user.setId(userId);
                user.setPhoneNumber(userPhoneNumber);
                user.setEmail(email);
                user.setName(firstName + " " + lastName);
                user.setRole("USER");
                userService.register(user); // Save the new user
                Response newUserResponse = userService.getUserByPhoneNumberAndEmail(userPhoneNumber, email);
                userDto = newUserResponse.getUser();
                System.out.println("userDto:" + userDto);
                System.out.println("user: " + user);

                user = Utils.mapUserDtoToUserEntity(userDto);
                System.out.println("user after mapdtotouser:" + user);
            } else {
                // If user exists, update the phone number
                userDto = userResponse.getUser();
                user = Utils.mapUserDtoToUserEntity(userDto);
                user.setPhoneNumber(userPhoneNumber);
                userService.updateUserProfile(user); // Save the updated user
            }



            // Create and save the booking
            Booking booking = new Booking();


            try {
                Instant instant = Instant.parse(bookingDateStart);
                LocalDateTime bookingDateStartParsed = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
                booking.setBookingDateStart(bookingDateStartParsed);
            }
            catch (DateTimeParseException e) {
                Response response = new Response();
                response.setMessage("Date time parsing error");
                System.out.println("Date time parsing error");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            booking.setUser(user);
            booking.setEstimate(estimate);

            Project project = projectService.getProjectByTypeAndAddressAndDescription(estimateType, estimateAddress, null);
//            booking.setProject(project);

            System.out.println("booking: " + booking);

            Response bookingResponse = bookingService.saveBooking(estimate.getId(), user.getId(), booking);
            if (bookingResponse.getStatusCode() == 200) {
                BookingDto bookingDto = Utils.mapBookingEntityToBookingDto(booking);
                bookingResponse.setBooking(bookingDto);
                sendConfirmationEmail(booking.getUser().getEmail(), booking.getBookingConfirmationCode(), booking, description, photo);
            }
            return ResponseEntity.status(bookingResponse.getStatusCode()).body(bookingResponse);
        } catch (Exception e) {
            Response response = new Response();
            response.setMessage("Error saving a booking: " + e.getMessage());
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
   
    private void sendConfirmationEmail(String to, String confirmationCode, Booking booking, String description, MultipartFile photo) {
        String subject = "Booking Confirmation";
        String text = String.format("Dear %s,\n\nYour booking has been confirmed.\n\nDetails:\nConfirmation Code: %s\nBooking Date: %s\nDescription: %s\n\nThank you!",
                booking.getUser().getName(), confirmationCode, booking.getBookingDateStart(), description);
        System.out.println("text:" + text);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);
            if (photo != null && !photo.isEmpty()) {
                helper.addAttachment(photo.getOriginalFilename(), photo);
            }
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
