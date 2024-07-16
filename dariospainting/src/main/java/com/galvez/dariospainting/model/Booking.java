package com.galvez.dariospainting.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Start time is required")
    private LocalDateTime bookingDateStart;

    // @NotNull(message = "End time is required")
    // private LocalDateTime bookingDateEnd;


    private String bookingConfirmationCode;

    

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "users_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estimates_id")
    private Estimate estimate;

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "projects_id")
//    private Project project;


    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", bookingDateStart=" + bookingDateStart +
//                ", bookingDateEnd=" + bookingDateEnd +
                ", bookingConfirmationCode='" + bookingConfirmationCode + '\'' +
                ", user=" + user +
                ", estimate=" + estimate +
//                ", project=" + project +
                '}';
    }
}


