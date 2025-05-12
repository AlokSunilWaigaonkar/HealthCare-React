package com.example.UserManagement.controller;

import com.example.UserManagement.model.Users.Doctor;
import com.example.UserManagement.model.Users.User;
import com.example.UserManagement.request.DoctorRegisterRequest;
import com.example.UserManagement.service.DoctorService;
import com.example.UserManagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final DoctorService doctorService;

    @PostMapping("/register-doctor")
    public ResponseEntity<Doctor> registerDoctor(@RequestBody DoctorRegisterRequest request) {
        Doctor doctor = doctorService.registerDoctor(request);
        return ResponseEntity.ok(doctor);
    }

    @GetMapping("/getUsers")
    public List<User> getUsers(){
        return userService.getUsers();
    }
}
