package com.example.UserManagement.service;

import com.example.UserManagement.model.Users.Doctor;
import com.example.UserManagement.repo.DoctorRepo;
import com.example.UserManagement.request.DoctorRegisterRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepo doctorRepo;
    private final JavaMailSender mailSender;
    private final BCryptPasswordEncoder passwordEncoder;

    public Doctor registerDoctor(DoctorRegisterRequest request) {
        // Validate the request
        if (request.getFirstName() == null || request.getLastName() == null || request.getEmail() == null) {
            throw new IllegalArgumentException("First name, last name, and email are required");
        }

        // Create doctor entity
        Doctor doctor = new Doctor();
        doctor.setFirstName(request.getFirstName());
        doctor.setLastName(request.getLastName());
        doctor.setEmail(request.getEmail());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setLicenseNumber(request.getLicenseNumber());

        // Generate system credentials for doctor login
        String systemGeneratedEmail = request.getFirstName().toLowerCase() + "." + request.getLastName().toLowerCase() + "@hospital.com";
        String systemGeneratedPassword = UUID.randomUUID().toString().substring(0, 8);
        String hashedPassword = passwordEncoder.encode(systemGeneratedPassword); // Secure password hashing

        // Update doctor entity with system-generated email and hashed password
        doctor.setSystemEmail(systemGeneratedEmail);
        doctor.setSystemPassword(hashedPassword);

        // Save doctor entity
        Doctor savedDoctor = doctorRepo.save(doctor);

        // Send the credentials to the doctor's email
        try {
            sendDoctorCredentialsEmail(doctor.getEmail(), systemGeneratedEmail, systemGeneratedPassword);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException("Failed to send credentials email to doctor", e);
        }

        return savedDoctor;
    }

    private void sendDoctorCredentialsEmail(String doctorEmail, String systemEmail, String password)
            throws MessagingException, UnsupportedEncodingException {
        String subject = "Your System-Generated Login Credentials";
        String senderName = "Hospital Management System";
        String mailContent = "<p>Dear Doctor,</p>"
                + "<p>Your account has been created successfully in our Hospital Management System. Below are your login credentials:</p>"
                + "<p><strong>Email:</strong> " + systemEmail + "</p>"
                + "<p><strong>Password:</strong> " + password + "</p>"
                + "<p>Please log in to your account and change your password immediately for security purposes.</p>"
                + "<p>Thank you,<br>Hospital Management System</p>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("shadowforgelab@gmail.com", senderName);
        helper.setTo(doctorEmail);
        helper.setSubject(subject);
        helper.setText(mailContent, true); // Enable HTML content

        mailSender.send(message);
    }
}