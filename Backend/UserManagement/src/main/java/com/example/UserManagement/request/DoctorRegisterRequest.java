package com.example.UserManagement.request;

import lombok.Data;

@Data
public class DoctorRegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String specialization;
    private String licenseNumber;

}

