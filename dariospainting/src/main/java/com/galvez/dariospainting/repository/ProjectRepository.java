package com.galvez.dariospainting.repository;

import com.galvez.dariospainting.model.Project;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("SELECT DISTINCT p.projectType FROM Project p")
    List<String> findDistinctProjectTypes();

    @Query("SELECT p FROM Project p WHERE p.projectType = :projectType AND p.projectAddress = :projectAddress AND p.projectDescription = :projectDescription")
    Project findProjectByTypeAndAddressAndDescription(String projectType, String projectAddress, String projectDescription);

//    @Query("SELECT p FROM Project p WHERE p.projectType = :projectType AND p.projectDateStarted >= :projectDateStarted AND p.projectDateFinished <= :projectDateFinished")
//    List<Project> findProjectsByDateAndType(LocalDate projectDateStarted, LocalDate projectDateFinished, String projectType);

    @Query(value=("SELECT * FROM projects WHERE project_type = :projectType AND project_date_started >= :projectDateStarted AND project_date_finished <= :projectDateFinished"), nativeQuery = true)
    List<Project> findProjectsByDateAndType(LocalDate projectDateStarted, LocalDate projectDateFinished, String projectType);
    @Query("SELECT p FROM Project p WHERE p.projectType = :projectType AND p.projectAddress = :projectAddress AND p.projectDateStarted >= :projectDateStarted AND p.projectDateFinished <= :projectDateFinished")
    List<Project> findProjectsByDateAndTypeAndAddress(LocalDate projectDateStarted, LocalDate projectDateFinished, String projectType, String projectAddress);
    
//    @Query("SELECT p FROM Project p WHERE p.id NOT IN (SELECT b.projectId FROM Booking b)")
//    List<Project> getAllAvailableProjects();

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO projects (project_address, project_date_finished, project_date_started, project_description, project_photo_url, project_type) VALUES (:projectAddress, :projectDateFinished, :projectDateStarted, :projectDescription, :projectPhotoUrl, :projectType)", nativeQuery = true)
    void saveProjectToDatabase(String projectAddress, LocalDate projectDateFinished, LocalDate projectDateStarted, String projectDescription, String projectPhotoUrl, String projectType);


    @Query("SELECT p FROM Project p WHERE p.projectType = :projectType AND p.projectAddress = :projectAddress")
    Project findProjectByTypeAndAddress(String projectType, String projectAddress);

    @Modifying
    @Transactional
    @Query(value = "UPDATE projects p SET p.project_date_finished = :projectDateFinished, p.project_date_started = :projectDateStarted, p.project_description = :projectDescription, p.project_photo_url = :projectPhotoUrl WHERE p.id = :projectId", nativeQuery = true)
    void updateFinishedProject(Long projectId, LocalDate projectDateFinished, LocalDate projectDateStarted, String projectDescription, String projectPhotoUrl);

}
