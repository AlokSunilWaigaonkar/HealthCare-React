package com.example.UserManagement.controller;

import com.example.UserManagement.model.AuthResponse;
import com.example.UserManagement.request.LoginRequest;
import com.example.UserManagement.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping
    public ResponseEntity<AuthResponse> login( @RequestBody LoginRequest loginRequest) {
        AuthResponse response = loginService.login(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(response);
    }
}