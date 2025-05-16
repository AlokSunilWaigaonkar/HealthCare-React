package com.example.UserManagement.model.Users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Patient extends User {


    private String firstName;
    private String lastName;
    private int age;
    private String gender;
    private Date dateOfBirth;
    private String address;
    private String bloodGroup;
    private String emergencyContact;
    private String contactNo;
    private String medicalHistory;
    @ManyToMany
    @JoinTable(
            name = "patient_doctor",
            joinColumns = @JoinColumn(name = "patient_id"),
            inverseJoinColumns = @JoinColumn(name = "doctor_id")
    )
    private List<Doctor> doctors = new ArrayList<>();



}
