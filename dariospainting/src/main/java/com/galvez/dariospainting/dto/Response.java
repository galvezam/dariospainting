package com.galvez.dariospainting.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

    private int statusCode;
    private String message;
    private String token;

    private String role;

    private String expirationTime;
    private String bookingConfirmationCode;

    private UserDto user;
    private BookingDto booking;
    private EstimateDto estimate;
    private List<UserDto> userList;
    private List<EstimateDto> estimateList;
    private List<BookingDto> bookingList;

    private ProjectDto project;
    private List<ProjectDto> projectList;

}
