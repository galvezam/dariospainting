package com.galvez.dariospainting.repository;

import com.galvez.dariospainting.model.Estimate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EstimateRepository extends JpaRepository<Estimate, Long> {

    @Query("SELECT DISTINCT e.estimateType FROM Estimate e")
    List<String> findDistinctEstimateTypes();

    @Query("SELECT e FROM Estimate e WHERE e.estimateType = :estimateType AND e.estimateAddress = :estimateAddress AND e.estimateDescription = :estimateDescription")
    Estimate findEstimateByTypeAndAddressAndDescription(String estimateType, String estimateAddress, String estimateDescription);

    @Query("SELECT e FROM Estimate e WHERE e.estimateType = :estimateType AND e.estimateAddress = :estimateAddress")
    Estimate findEstimateByTypeAndAddress(String estimateType, String estimateAddress);


    // @Query("SELECT e FROM Estimate e WHERE e.estimateAddress LIKE %:estimateAddress% AND e.estimateType LIKE %:estimateType% AND e.id NOT IN (SELECT bk.estimate.id FROM Booking bk WHERE" +
    //         "(bk.bookingDateStart <= :bookingDateEnd) AND (bk.bookingDateEnd >= :bookingDateStart))")
    // List<Estimate> findAvailableEstimatesByDateAndAddressAndType(LocalDateTime bookingDateStart, LocalDateTime bookingDateEnd, String estimateAddress, String estimateType);
    @Query("SELECT e FROM Estimate e WHERE e.id NOT IN (SELECT b.estimate.id FROM Booking b)")
    List<Estimate> getAllAvailableEstimates();
}
