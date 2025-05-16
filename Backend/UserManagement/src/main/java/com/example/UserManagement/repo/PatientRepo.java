package com.example.UserManagement.repo;

import com.example.UserManagement.model.Users.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepo extends JpaRepository<Patient,Long> {
    Optional<Patient> findByEmail(String email);

    long countByEnabledTrue();
}
