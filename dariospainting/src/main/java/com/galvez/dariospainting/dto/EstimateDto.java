package com.galvez.dariospainting.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EstimateDto {

    private Long id;
    private String estimateAddress;
    private String estimateType;
    private String estimatePhotoUrl;
    private String estimateDescription;
    private List<BookingDto> bookings;

}
