package com.example.UserManagement.request;


import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String username;
    private String password;
    private String role;
    private String firstName;
    private String lastName;
    private String contactNo;
    private String address;
}
