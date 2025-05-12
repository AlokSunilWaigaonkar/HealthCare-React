package com.example.UserManagement.controller;

import com.example.UserManagement.model.Users.Doctor;
import com.example.UserManagement.request.DoctorRegisterRequest;
import com.example.UserManagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

    @PostMapping("/register-doctor")
    public ResponseEntity<Doctor> registerDoctor(@RequestBody DoctorRegisterRequest request) {
        Doctor doctor = userService.registerDoctor(request);
        return ResponseEntity.ok(doctor);
    }
}
