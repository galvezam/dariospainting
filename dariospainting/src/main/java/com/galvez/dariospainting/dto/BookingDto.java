package com.galvez.dariospainting.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingDto {

    private Long id;
    private LocalDateTime bookingDateStart;
    private LocalDateTime bookingDateEnd;
    private String bookingConfirmationCode;
    private UserDto user;
    private EstimateDto estimate;


}
