package com.example.UserManagement.controller;

import com.example.UserManagement.model.AuthResponse;
import com.example.UserManagement.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping
    public ResponseEntity<AuthResponse> login(@RequestParam String email, @RequestParam String password) {
        AuthResponse response = loginService.login(email, password);
        return ResponseEntity.ok(response);
    }
}