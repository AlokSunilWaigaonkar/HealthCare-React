package com.example.UserManagement.model.AdditionalUserInfo;

import com.example.UserManagement.request.AddressRequest;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class Address extends AddressRequest {
    private String street;
    private String city;
    private String state;
    private String zipcode;
    private String country;
}