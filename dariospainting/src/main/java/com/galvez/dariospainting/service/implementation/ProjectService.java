package com.galvez.dariospainting.service.implementation;

import com.galvez.dariospainting.dto.ProjectDto;
import com.galvez.dariospainting.dto.Response;
import com.galvez.dariospainting.exception.OurException;
import com.galvez.dariospainting.model.Project;
import com.galvez.dariospainting.repository.ProjectRepository;
import com.galvez.dariospainting.utils.Utils;
import com.galvez.dariospainting.service.AwsS3Service;
import com.galvez.dariospainting.service.servInterface.ProjectServInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProjectService implements ProjectServInterface {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private AwsS3Service awsS3Service;

    @Override
    public Response addFinishedProject(MultipartFile photo, String projectAddress, String projectType, String projectDescription, LocalDate projectDateStarted, LocalDate projectDateFinished) {

        Response response = new Response();
        try {
//            Project project = new Project();
            String imageUrl = null;
            if (photo != null) {
                imageUrl = awsS3Service.saveImageToS3(photo);
//                project.setProjectPhotoUrl(imageUrl);
            }

            Project project = projectRepository.findProjectByTypeAndAddress(projectType, projectAddress);
            System.out.println("project: " + project);

            
//            project.setProjectAddress(projectAddress);
//            project.setProjectType(projectType);
//            project.setProjectDescription(projectDescription);
//            project.setProjectDateStarted(projectDateStarted);
//            project.setProjectDateFinished(projectDateFinished);

            projectRepository.updateFinishedProject(project.getId(), projectDateFinished, projectDateStarted, projectDescription, imageUrl);
            // Project savedProject = projectRepository.save(project);
            // ProjectDto projectDto = Utils.mapProjectEntityToProjectDto(savedProject);
            response.setStatusCode(200);
            response.setMessage("Successful");
            // response.setProject(projectDto);
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving an estimate " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response saveInitialProject(String projectAddress, String projectType, String projectDescription) {
        Response response = new Response();
        try {
            Project project = new Project();
            project.setProjectAddress(projectAddress);
            project.setProjectType(projectType);
            project.setProjectDescription(projectDescription);
            projectRepository.saveProjectToDatabase(projectAddress, null, null, projectDescription, null, projectType);
            ProjectDto projectDto = Utils.mapProjectEntityToProjectDto(project);
            response.setStatusCode(200);
            response.setMessage("Successful");  
            response.setProject(projectDto);
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving an initial project " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getProjectById(Long projectId) {

        Response response = new Response();

        try {
            Project project = projectRepository.findById(projectId).orElseThrow(() -> new OurException("Project Not Found"));
            ProjectDto projectDto = Utils.mapProjectEntityToProjectDto(project);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setProject(projectDto);
        }
        catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving project " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteProject(Long projectId) {

        Response response = new Response();
        try {
            projectRepository.findById(projectId).orElseThrow(() -> new OurException("Project Not Found"));
            projectRepository.deleteById(projectId);
            response.setStatusCode(200);
            response.setMessage("Successful");
        }
        catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error deleting project " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateProject(Long projectId, String projectDescription, String projectType, String projectAddress, MultipartFile photo, LocalDate projectDateStarted, LocalDate projectDateFinished) {
        Response response = new Response();
        try {
            String imageUrl = null;
            if (photo != null && !photo.isEmpty()) {
                imageUrl = awsS3Service.saveImageToS3(photo);
            }
            Project project = projectRepository.findById(projectId).orElseThrow(() -> new OurException("Project Not Found"));
            if (projectType != null) project.setProjectType(projectType);
            if (projectAddress != null) project.setProjectAddress(projectAddress);
            if (projectDescription != null) project.setProjectDescription(projectDescription);
            if (imageUrl != null) project.setProjectPhotoUrl(imageUrl);
            if (projectDateStarted != null) project.setProjectDateStarted(projectDateStarted);
            if (projectDateFinished != null) project.setProjectDateFinished(projectDateFinished);

            Project updatedProject = projectRepository.save(project);
            ProjectDto projectDto = Utils.mapProjectEntityToProjectDto(updatedProject);

            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setProject(projectDto);
        }
        catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error updating project " + e.getMessage());
        }
        return response;
    }

    @Override
    public List<String> getAllProjectTypes() {
        return projectRepository.findDistinctProjectTypes();
    }


    @Override
    public Project getProjectByTypeAndAddressAndDescription(String projectType, String projectAddress, String projectDescription) {
        return projectRepository.findProjectByTypeAndAddressAndDescription(projectType, projectAddress, projectDescription);
    }

    @Override
    public Response getAllProjects() {

        Response response = new Response();
        try {
            List<Project> projectList = projectRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<ProjectDto> projectDtoList = Utils.mapProjectListEntityToProjectListDto(projectList);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setProjectList(projectDtoList);
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving projects " + e.getMessage());
        }
        return response;
    }

    @Override
    public List<Project> getProjectsByDateAndType(LocalDate projectDateStarted, LocalDate projectDateFinished, String projectType) {
        return projectRepository.findProjectsByDateAndType(projectDateStarted, projectDateFinished, projectType);
    }

    @Override
    public List<Project> getProjectsByDateAndTypeAndAddress(LocalDate projectDateStarted, LocalDate projectDateFinished, String projectType, String projectAddress) {
        return projectRepository.findProjectsByDateAndTypeAndAddress(projectDateStarted, projectDateFinished, projectType, projectAddress);
    }
    
}