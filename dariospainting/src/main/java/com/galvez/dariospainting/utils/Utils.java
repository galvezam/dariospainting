package com.galvez.dariospainting.utils;

import com.galvez.dariospainting.dto.BookingDto;
import com.galvez.dariospainting.dto.EstimateDto;
import com.galvez.dariospainting.dto.UserDto;
import com.galvez.dariospainting.dto.ProjectDto;
import com.galvez.dariospainting.model.Project;
import com.galvez.dariospainting.model.Booking;
import com.galvez.dariospainting.model.Estimate;
import com.galvez.dariospainting.model.User;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

public class Utils {

    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();

    public static String generateRandomConfirmationCode(int length) {
        StringBuilder str = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            str.append(randomChar);
        }
        return str.toString();
    }

    public static UserDto mapUserEntityToUserDto(User user) {
        UserDto userDto = new UserDto();

        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setRole(user.getRole());
        return userDto;
    }

    public static EstimateDto mapEstimateEntityToEstimateDto(Estimate estimate) {
        EstimateDto estimateDto = new EstimateDto();

        estimateDto.setId(estimate.getId());
        estimateDto.setEstimateAddress(estimate.getEstimateAddress());
        estimateDto.setEstimateType(estimate.getEstimateType());
        estimateDto.setEstimateDescription(estimate.getEstimateDescription());
        estimateDto.setEstimatePhotoUrl(estimate.getEstimatePhotoUrl());
        return estimateDto;
    }

    public static BookingDto mapBookingEntityToBookingDto(Booking booking) {
        BookingDto bookingDto = new BookingDto();

        bookingDto.setId(booking.getId());
        bookingDto.setBookingDateStart(booking.getBookingDateStart());
        // bookingDto.setBookingDateEnd(booking.getBookingDateEnd());
        bookingDto.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        bookingDto.setUser(mapUserEntityToUserDto(booking.getUser()));
        bookingDto.setEstimate(mapEstimateEntityToEstimateDto(booking.getEstimate()));
        return bookingDto;
    }

    public static EstimateDto mapEstimateEntityToEstimateDtoPLUSBookings(Estimate estimate) {
        EstimateDto estimateDto = new EstimateDto();

        estimateDto.setId(estimate.getId());
        estimateDto.setEstimateAddress(estimate.getEstimateAddress());
        estimateDto.setEstimateType(estimate.getEstimateType());
        estimateDto.setEstimateDescription(estimate.getEstimateDescription());
        estimateDto.setEstimatePhotoUrl(estimate.getEstimatePhotoUrl());

        if (estimate.getBookings() != null) {
            estimateDto.setBookings(estimate.getBookings().stream()
                    .map(Utils::mapBookingEntityToBookingDto)
                    .collect(Collectors.toList()));
        }

        return estimateDto;
    }

    public static BookingDto mapBookingEntityToBookingDtoPLUSBookedEstimates(Booking booking, boolean mapUser) {
        BookingDto bookingDto = new BookingDto();

        bookingDto.setId(booking.getId());
        bookingDto.setBookingDateStart(booking.getBookingDateStart());
        // bookingDto.setBookingDateEnd(booking.getBookingDateEnd());
        bookingDto.setBookingConfirmationCode(booking.getBookingConfirmationCode());

        if (mapUser) {
            bookingDto.setUser(Utils.mapUserEntityToUserDto(booking.getUser()));
        }
        if (booking.getEstimate() != null) {
            EstimateDto estimateDto = new EstimateDto();

            estimateDto.setId(booking.getEstimate().getId());
            estimateDto.setEstimateAddress(booking.getEstimate().getEstimateAddress());
            estimateDto.setEstimateType(booking.getEstimate().getEstimateType());
            estimateDto.setEstimateDescription(booking.getEstimate().getEstimateDescription());
            estimateDto.setEstimatePhotoUrl(booking.getEstimate().getEstimatePhotoUrl());
            bookingDto.setEstimate(estimateDto);

        }
        return bookingDto;

    }

    public static UserDto mapUserEntityToUserDtoPLUSUserBookingsAndEstimate(User user) {
        UserDto userDto = new UserDto();

        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setRole(user.getRole());

        if (!user.getBookings().isEmpty()) {
            userDto.setBookings(user.getBookings().stream()
                    .map(booking -> mapBookingEntityToBookingDtoPLUSBookedEstimates(booking, false))
                    .collect(Collectors.toList()));
        }
        return userDto;
    }

    public static List<UserDto> mapUserListEntityToUserListDto(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDto).collect(Collectors.toList());
    }

    public static List<EstimateDto> mapEstimateListEntityToEstimateListDto(List<Estimate> estimateList) {
        return estimateList.stream().map(Utils::mapEstimateEntityToEstimateDto).collect(Collectors.toList());
    }

    public static List<BookingDto> mapBookingListEntityToBookingListDto(List<Booking> bookingList) {
        return bookingList.stream().map(Utils:: mapBookingEntityToBookingDto).collect(Collectors.toList());
    }


    public static User mapUserDtoToUserEntity(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setEmail(userDto.getEmail());
        user.setName(userDto.getName());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setRole(userDto.getRole());
        return user;
    }

    public static Estimate mapEstimateDtoToEstimateEntity(EstimateDto estimateDto) {
        Estimate estimate = new Estimate();
        estimate.setId(estimateDto.getId());
        estimate.setEstimateAddress(estimateDto.getEstimateAddress());
        estimate.setEstimateType(estimateDto.getEstimateType());
        estimate.setEstimatePhotoUrl(estimateDto.getEstimatePhotoUrl());
        estimate.setEstimateDescription(estimateDto.getEstimateDescription());
        return estimate;
    }

    public static Project mapProjectDtoToProjectEntity(ProjectDto projectDto) {
        Project project = new Project();
        project.setId(projectDto.getId());
        project.setProjectAddress(projectDto.getProjectAddress());
        project.setProjectType(projectDto.getProjectType());
        project.setProjectPhotoUrl(projectDto.getProjectPhotoUrl());
        project.setProjectDescription(projectDto.getProjectDescription());
        return project;
    }

    public static ProjectDto mapProjectEntityToProjectDto(Project project) {
        ProjectDto projectDto = new ProjectDto();
        projectDto.setId(project.getId());
        projectDto.setProjectAddress(project.getProjectAddress());
        projectDto.setProjectType(project.getProjectType());
        projectDto.setProjectPhotoUrl(project.getProjectPhotoUrl());
        projectDto.setProjectDescription(project.getProjectDescription());
        projectDto.setProjectDateStarted(project.getProjectDateStarted());
        projectDto.setProjectDateFinished(project.getProjectDateFinished());
        return projectDto;
    }

    public static List<ProjectDto> mapProjectListEntityToProjectListDto(List<Project> projectList) {
        return projectList.stream().map(Utils:: mapProjectEntityToProjectDto).collect(Collectors.toList());
    }
}
