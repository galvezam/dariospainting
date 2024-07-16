package com.galvez.dariospainting.service.servInterface;

import com.galvez.dariospainting.dto.Response;
import com.galvez.dariospainting.model.Project;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

public interface ProjectServInterface {

    Response addFinishedProject(MultipartFile photo, String projectAddress, String projectType, String projectDescription, LocalDate projectDateStarted, LocalDate projectDateFinished);
    Response saveInitialProject(String projectAddress, String projectType, String projectDescription);
    Response getProjectById(Long id);
    
    Response deleteProject(Long projectId);
    Response updateProject(Long projectId, String projectDescription, String projectType, String projectAddress, MultipartFile photo, LocalDate projectDateStarted, LocalDate projectDateFinished);
    List<String> getAllProjectTypes();
    Project getProjectByTypeAndAddressAndDescription(String projectType, String projectAddress, String projectDescription);
    Response getAllProjects();
    List<Project> getProjectsByDateAndType(LocalDate projectDateStarted, LocalDate projectDateFinished, String projectType);
    List<Project> getProjectsByDateAndTypeAndAddress(LocalDate projectDateStarted, LocalDate projectDateFinished, String projectType, String projectAddress);
}
