package com.example.UserManagement.repo;

import com.example.UserManagement.model.Users.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepo extends JpaRepository<Doctor,Long> {
}
