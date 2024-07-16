package com.galvez.dariospainting.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "estimates")
public class Estimate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // private String bookingConfirmationCode;

    private String estimateAddress;

    private String estimateType;

    private String estimatePhotoUrl;

    private String estimateDescription;

    @OneToMany(mappedBy = "estimate", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

    @Override
    public String toString() {
        return "Estimate{" +
                "id=" + id +
                /*", bookingConfirmationCode='" + bookingConfirmationCode + '\'' +*/
                ", estimateAddress='" + estimateAddress + '\'' +
                ", estimateType='" + estimateType + '\'' +
                ", estimatePhotoUrl='" + estimatePhotoUrl + '\'' +
                ", estimateDescription='" + estimateDescription + '\'' +
                '}';
    }
}
