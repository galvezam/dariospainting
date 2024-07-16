package com.galvez.dariospainting.service.servInterface;

import com.galvez.dariospainting.dto.Response;
import com.galvez.dariospainting.model.Estimate;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public interface EstimateServInterface {

    Response addNewEstimate(MultipartFile photo, String estimateAddress, String estimateType, String estimateDescription);

    List<String> getAllEstimateTypes();

    Estimate getEstimateByTypeAndAddress(String estimateType, String estimateAddress);
    Estimate getEstimateByTypeAndAddressAndDescription(String estimateType, String estimateAddress, String estimateDescription);

    Response getAllEstimates();

    Response deleteEstimate(Long estimateId);

    Response updateEstimate(Long estimateId, String estimateDescription, String estimateType, String estimateAddress, MultipartFile photo);

    Response getEstimateById(Long estimateId);

    // Response getAvailableEstimatesByDateAndAddressAndType(LocalDateTime bookingDateStart, LocalDateTime bookingDateEnd, String estimateAddress, String estimateType);

    Response getAllAvailableEstimates();
}
