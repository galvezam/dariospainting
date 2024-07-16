package com.galvez.dariospainting.controller;

import com.galvez.dariospainting.dto.*;
import com.galvez.dariospainting.model.Booking;
import com.galvez.dariospainting.model.Estimate;
import com.galvez.dariospainting.model.Project;
import com.galvez.dariospainting.model.User;
import com.galvez.dariospainting.service.servInterface.BookingServInterface;
import com.galvez.dariospainting.service.servInterface.EstimateServInterface;
import com.galvez.dariospainting.service.servInterface.ProjectServInterface;
import com.galvez.dariospainting.service.servInterface.UserServInterface;
import com.galvez.dariospainting.utils.Utils;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchTransactionManager;
import org.springframework.format.annotation.DateTimeFormat;
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
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@RequestMapping("/estimates")
public class EstimateController {

    @Autowired
    private EstimateServInterface estimateService;

    @Autowired
    private UserServInterface userService;

    @Autowired
    private BookingServInterface bookingService;

    @Autowired
    private ProjectServInterface projectService;

    @Autowired
    private JavaMailSender mailSender;


    @PostMapping("/add-estimate")
    public ResponseEntity<Response> addNewEstimate(
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "estimateAddress", required = false) String estimateAddress,
            @RequestParam(value = "estimateType", required = false) String estimateType,
            @RequestParam(value = "bookingDateStart", required = false) String bookingDateStart,
            @RequestParam(value = "userPhoneNumber", required = false) String userPhoneNumber,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "estimateDescription", required = false) String estimateDescription
    ) {
        if (estimateAddress == null || estimateType == null) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide values for all fields.");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }

        Response response = estimateService.addNewEstimate(photo, estimateAddress, estimateType, estimateDescription);
        EstimateDto estimateDto = response.getEstimate();
        Estimate estimate = Utils.mapEstimateDtoToEstimateEntity(estimateDto);
        System.out.println("estimate: " + estimate);
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
            System.out.println("userdto if already exists: " + userDto);
            user = Utils.mapUserDtoToUserEntity(userDto);
            System.out.println("user if already exists: " + user);
            // user.setPhoneNumber(userPhoneNumber);
            // userService.updateUserProfile(user); // Save the updated user
        }

        Booking booking = new Booking();


        try {
            Instant instant = Instant.parse(bookingDateStart);
            LocalDateTime bookingDateStartParsed = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
            booking.setBookingDateStart(bookingDateStartParsed);
        } catch (DateTimeParseException e) {
            Response dateResponse = new Response();
            dateResponse.setMessage("Date time parsing error");
            System.out.println("Date time parsing error");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(dateResponse);
        }
        booking.setUser(user);
        booking.setEstimate(estimate);
        System.out.println("booking: " + booking);

        Response bookingResponse = bookingService.saveBooking(estimate.getId(), user.getId(), booking);
        if (bookingResponse.getStatusCode() == 200) {
            BookingDto bookingDto = Utils.mapBookingEntityToBookingDto(booking);
            bookingResponse.setBooking(bookingDto);
            // sendConfirmationEmail(booking.getUser().getEmail(), booking.getBookingConfirmationCode(), booking, estimateDescription, photo);
        }


        Project project = new Project();

        Response projectResponse = new Response();
        try {
            project.setProjectAddress(estimateAddress);
            project.setProjectType(estimateType);


            System.out.println("project: " + project);
            // Response projectBookingResponse = bookingService.findBookingByConfirmationCode(bookingResponse.getBookingConfirmationCode());

            if (estimateDescription == null) {
                projectResponse = projectService.saveInitialProject(estimateAddress, estimateType, "");
            } else {
                projectResponse = projectService.saveInitialProject(estimateAddress, estimateType, estimateDescription);
            }

            projectResponse.setStatusCode(200);
            projectResponse.setMessage("Initial project saved successfully");
//            project.setBooking(booking);
//            booking.setProject(project);
        } catch (Exception e) {
            // Response projectResponseError = new Response();
            // projectResponseError.setMessage("Error creating project");

            projectResponse.setMessage("Error creating project");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(projectResponse);
            // return ResponseEntity.status(projectResponseError.getStatusCode()).body(projectResponseError);
        }


        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all-estimates")
    public ResponseEntity<Response> getAllEstimates() {
        Response response = estimateService.getAllEstimates();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/types")
    public List<String> getEstimateTypes() {
        return estimateService.getAllEstimateTypes();
    }

    @GetMapping("/estimate-id/{estimateId}")
    public ResponseEntity<Response> getEstimateById(@PathVariable Long estimateId) {
        Response response = estimateService.getEstimateById(estimateId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all-available-estimates")
    public ResponseEntity<Response> getAvailableEstimates() {
        Response response = estimateService.getAllAvailableEstimates();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

//    @GetMapping("/available-estimates-by-date-and-address")
//    public ResponseEntity<Response> getAvailableEstimatesByDateAndAddressAndType(
//            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime bookingDateStart,
//            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime bookingDateEnd,
//            @RequestParam(required = false) String estimateAddress,
//            @RequestParam(required = false) String estimateType
//    ) {
//        if (bookingDateStart == null || bookingDateEnd == null || estimateAddress == null || estimateType == null) {
//            Response response = new Response();
//            response.setStatusCode(400);
//            response.setMessage("Please provide values for all fields.");
//            return ResponseEntity.status(response.getStatusCode()).body(response);
//        }
//        Response response = estimateService.getAvailableEstimatesByDateAndAddressAndType(bookingDateStart, bookingDateEnd, estimateAddress, estimateType);
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }

    @PutMapping("/update/{estimateId}")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateEstimate(
            @PathVariable Long estimateId,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "estimateAddress", required = false) String estimateAddress,
            @RequestParam(value = "estimateType", required = false) String estimateType,
            @RequestParam(value = "estimateDescription", required = false) String estimateDescription
    ) {
        Response response = estimateService.updateEstimate(estimateId, estimateDescription, estimateType, estimateAddress, photo);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{estimateId}")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteEstimate(@PathVariable Long estimateId) {
        Response response = estimateService.deleteEstimate(estimateId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
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
