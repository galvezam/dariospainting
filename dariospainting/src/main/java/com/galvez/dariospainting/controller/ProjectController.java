package com.galvez.dariospainting.controller;

import com.galvez.dariospainting.dto.ProjectDto;
import com.galvez.dariospainting.dto.Response;
import com.galvez.dariospainting.model.Project;
import com.galvez.dariospainting.service.servInterface.ProjectServInterface;
import com.galvez.dariospainting.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private ProjectServInterface projectService;



    @PostMapping("/add-project")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> addProject(@RequestParam(value = "photo", required = false) MultipartFile photo,
                                               @RequestParam(value = "projectAddress", required = false) String projectAddress,
                                               @RequestParam(value = "projectType", required = false) String projectType,
                                               @RequestParam(value = "projectDateStarted", required = false) String projectDateStarted,
                                               @RequestParam(value = "projectDateFinished", required = false) String projectDateFinished,
                                               @RequestParam(value = "projectDescription", required = false) String projectDescription) {


        Response response = new Response();
        LocalDate projectDateStartedParsed = stringToDate(projectDateStarted);
        LocalDate projectDateFinishedParsed = stringToDate(projectDateFinished);

        // Project project = projectService.getProjectByTypeAndAddressAndDescription(projectType, projectAddress, null);

        try {
            response = projectService.addFinishedProject(photo, projectAddress, projectType, projectDescription, projectDateStartedParsed, projectDateFinishedParsed);
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error adding a finished project " + e.getMessage());
        }
//        Response projectResponse = projectService.getProjectById(project.getId());
//        ProjectDto projectDto = Utils.mapProjectEntityToProjectDto(project);
//        Response response = null;
//        if (projectDto.equals(projectResponse.getProject())) {
//            response = projectService.addFinishedProject(photo, projectDto.getProjectAddress(), projectDto.getProjectType(), projectDescription, projectDateStartedParsed, projectDateFinishedParsed);
//        }

        response.setMessage("Project added successfully");

        System.out.println("Project added successfully");
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    @GetMapping("/all-projects")
    public ResponseEntity<Response> getAllProjects() {
        Response response = projectService.getAllProjects();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/types")
    public List<String> getProjectTypes() {
        return projectService.getAllProjectTypes();
    }

    @PutMapping("/update/{projectId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateProject(
            @PathVariable Long projectId,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "projectAddress", required = false) String projectAddress,
            @RequestParam(value = "projectType", required = false) String projectType,
            @RequestParam(value = "projectDescription", required = false) String projectDescription,
            @RequestParam(value = "projectDateStarted", required = false) String projectDateStarted,
            @RequestParam(value = "projectDateFinished", required = false) String projectDateFinished
    ) {

        LocalDate projectDateStartedParsed = stringToDate(projectDateStarted);
        LocalDate projectDateFinishedParsed = stringToDate(projectDateStarted);
        Response response = projectService.updateProject(projectId, projectDescription, projectType, projectAddress, photo, projectDateStartedParsed, projectDateFinishedParsed);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{projectId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteProject(@PathVariable Long projectId) {
        Response response = projectService.deleteProject(projectId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/project-id/{projectId}")
    public ResponseEntity<Response> getProjectById(@PathVariable Long projectId) {
        Response response = projectService.getProjectById(projectId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/projects-by-date-and-type")
    public List<Project> getProjectsByDateAndType(@RequestParam(value = "projectDateStarted", required = false) String projectDateStarted,
                                                  @RequestParam(value = "projectDateFinished", required = false) String projectDateFinished,
                                                  @RequestParam(value = "projectType", required = false) String projectType,
                                                  @RequestParam(value = "projectAddress", required = false) String projectAddress) {
        LocalDate projectDateStartedParsed = stringToDate(projectDateStarted);
        LocalDate projectDateFinishedParsed = stringToDate(projectDateFinished);
        System.out.println("date start not parsed" + projectDateStarted);
        System.out.println("date finish not parsed" + projectDateFinished);

        System.out.println("date start: " + projectDateStartedParsed);
        System.out.println("date finished: " + projectDateFinishedParsed);
        if (projectAddress != null && !projectAddress.isEmpty() && !projectAddress.isBlank()) {
            return projectService.getProjectsByDateAndTypeAndAddress(projectDateStartedParsed, projectDateFinishedParsed, projectType, projectAddress);
        }

        System.out.println("filtered projects below: ");
        System.out.println(projectService.getProjectsByDateAndType(projectDateStartedParsed, projectDateFinishedParsed, projectType));
        return projectService.getProjectsByDateAndType(projectDateStartedParsed, projectDateFinishedParsed, projectType);
    }


    private LocalDate stringToDate(String date) {
        if (date == null) {
            return null;
        }
        LocalDate newDate;
        try {
            Instant instantStart = Instant.parse(date);
            newDate = LocalDate.ofInstant(instantStart, ZoneId.systemDefault());
        } catch (DateTimeParseException e) {
            // Handle the exception, maybe log it or rethrow it
            throw new IllegalArgumentException("Invalid date format: " + date, e);
        }
        return newDate;
    }
}