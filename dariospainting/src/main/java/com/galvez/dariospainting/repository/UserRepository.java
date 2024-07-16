package com.galvez.dariospainting.repository;

import com.galvez.dariospainting.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.phoneNumber = :phoneNumber AND u.email = :email")
    Optional<User> findByPhoneNumberAndEmail(String phoneNumber, String email);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO users (email, name, password, phone_number, role) VALUES (:email, :name, :password, :phoneNumber, :role)", nativeQuery = true)
    void saveUserToDatabase(String email, String name, String password, String phoneNumber, String role);

}
