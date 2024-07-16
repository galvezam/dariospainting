package com.galvez.dariospainting.dto;

import com.galvez.dariospainting.dto.BookingDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectDto {
    
    private Long id;
    private String projectAddress;
    private String projectType;
    private String projectPhotoUrl;
    private String projectDescription;
    private LocalDate projectDateStarted;
    private LocalDate projectDateFinished;
    // private BookingDto booking;
}
