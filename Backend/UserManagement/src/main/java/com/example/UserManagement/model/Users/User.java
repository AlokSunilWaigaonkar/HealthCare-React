package com.example.UserManagement.model.Users;

import com.example.UserManagement.model.Role;
import com.example.UserManagement.request.AddressRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    @NaturalId(mutable = true)
    private String email;
    private String password;
    private boolean enabled = false;

    @Enumerated(EnumType.STRING)
    private Role role;
    private String firstName;
    private String lastName;
    private String contactNo;
    private AddressRequest address;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor; // Each patient can be assigned to one doctor
}
