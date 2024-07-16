package com.galvez.dariospainting.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // private String bookingConfirmationCode;

    private String projectAddress;

    private String projectType;

    private String projectPhotoUrl;

    private String projectDescription;

    private LocalDate projectDateStarted;
    private LocalDate projectDateFinished;

//    @OneToOne(mappedBy = "project", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name = "bookings_id")
//    private Booking booking;

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", projectAddress='" + projectAddress + '\'' +
                ", projectType='" + projectType + '\'' +
                ", projectPhotoUrl='" + projectPhotoUrl + '\'' +
                ", projectDescription='" + projectDescription + '\'' +
                ", projectDateStarted='" + projectDateStarted + '\'' +
                ", projectDateFinished='" + projectDateFinished + '\'' +
//                ", booking=" + booking +
                '}';
    }
    
}
