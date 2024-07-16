package com.galvez.dariospainting.service.implementation;

import com.galvez.dariospainting.dto.EstimateDto;
import com.galvez.dariospainting.dto.Response;
import com.galvez.dariospainting.exception.OurException;
import com.galvez.dariospainting.model.Estimate;
import com.galvez.dariospainting.repository.BookingRepository;
import com.galvez.dariospainting.repository.EstimateRepository;
import com.galvez.dariospainting.service.AwsS3Service;
import com.galvez.dariospainting.service.servInterface.EstimateServInterface;
import com.galvez.dariospainting.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EstimateService implements EstimateServInterface {

    @Autowired
    private EstimateRepository estimateRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private AwsS3Service awsS3Service;



    @Override
    public Response addNewEstimate(MultipartFile photo, String estimateAddress, String estimateType, String estimateDescription) {
        Response response = new Response();

        try {

            Estimate estimate = new Estimate();
            if (photo != null) {
                String imageUrl = awsS3Service.saveImageToS3(photo);
                estimate.setEstimatePhotoUrl(imageUrl);
            }
            
            estimate.setEstimateAddress(estimateAddress);
            estimate.setEstimateType(estimateType);
            estimate.setEstimateDescription(estimateDescription);

            Estimate savedEstimate = estimateRepository.save(estimate);
            EstimateDto estimateDto = Utils.mapEstimateEntityToEstimateDto(savedEstimate);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setEstimate(estimateDto);
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving an estimate " + e.getMessage());
        }
        return response;
    }

    @Override
    public List<String> getAllEstimateTypes() {
        return estimateRepository.findDistinctEstimateTypes();
    }

    @Override
    public Estimate getEstimateByTypeAndAddressAndDescription(String estimateType, String estimateAddress, String estimateDescription) {
        return estimateRepository.findEstimateByTypeAndAddressAndDescription(estimateType, estimateAddress, estimateDescription);
    }

    @Override
    public Estimate getEstimateByTypeAndAddress(String estimateType, String estimateAddress) {
        return estimateRepository.findEstimateByTypeAndAddress(estimateType, estimateAddress);
    }
    @Override
    public Response getAllEstimates() {
        Response response = new Response();

        try {
            List<Estimate> estimateList = estimateRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<EstimateDto> estimateDtoList = Utils.mapEstimateListEntityToEstimateListDto(estimateList);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setEstimateList(estimateDtoList);
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving an estimate " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteEstimate(Long estimateId) {
        Response response = new Response();

        try {
            estimateRepository.findById(estimateId).orElseThrow(() -> new OurException("Estimate Not Found"));
            estimateRepository.deleteById(estimateId);
            response.setStatusCode(200);
            response.setMessage("Successful");
        }
        catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving estimate " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateEstimate(Long estimateId, String estimateDescription, String estimateType, String estimateAddress, MultipartFile photo) {
        Response response = new Response();

        try {
            String imageUrl = null;
            if (photo != null && !photo.isEmpty()) {
                imageUrl = awsS3Service.saveImageToS3(photo);
            }
            Estimate estimate = estimateRepository.findById(estimateId).orElseThrow(() -> new OurException("Estimate Not Found"));
            if (estimateType != null) estimate.setEstimateType(estimateType);
            if (estimateAddress != null) estimate.setEstimateAddress(estimateAddress);
            if (estimateDescription != null) estimate.setEstimateDescription(estimateDescription);
            if (imageUrl != null) estimate.setEstimatePhotoUrl(imageUrl);

            Estimate updatedEstimate = estimateRepository.save(estimate);
            EstimateDto estimateDto = Utils.mapEstimateEntityToEstimateDto(updatedEstimate);

            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setEstimate(estimateDto);
        }
        catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a room " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getEstimateById(Long estimateId) {
        Response response = new Response();

        try {
            Estimate estimate = estimateRepository.findById(estimateId).orElseThrow(() -> new OurException("Estimate Not Found"));
            EstimateDto estimateDto = Utils.mapEstimateEntityToEstimateDtoPLUSBookings(estimate);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setEstimate(estimateDto);
        }
        catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a room " + e.getMessage());
        }
        return response;
    }

//    @Override
//    public Response getAvailableEstimatesByDateAndAddressAndType(LocalDateTime bookingDateStart, LocalDateTime bookingDateEnd, String estimateAddress, String estimateType) {
//        Response response = new Response();
//
//        try {
//            List<Estimate> availableEstimates = estimateRepository.findAvailableEstimatesByDateAndAddressAndType(bookingDateStart, bookingDateEnd, estimateAddress, estimateType);
//            List<EstimateDto> estimateDtoList = Utils.mapEstimateListEntityToEstimateListDto(availableEstimates);
//            response.setStatusCode(200);
//            response.setMessage("Successful");
//            response.setEstimateList(estimateDtoList);
//        }
//        catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error saving estimate " + e.getMessage());
//        }
//        return response;
//    }

    @Override
    public Response getAllAvailableEstimates() {
        Response response = new Response();

        try {
            List<Estimate> estimateList = estimateRepository.getAllAvailableEstimates();
            List<EstimateDto> estimateDtoList = Utils.mapEstimateListEntityToEstimateListDto(estimateList);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setEstimateList(estimateDtoList);
        }
        catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting all users " + e.getMessage());
        }
        return response;
    }
}
