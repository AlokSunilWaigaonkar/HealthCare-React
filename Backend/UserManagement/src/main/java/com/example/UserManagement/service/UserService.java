package com.example.UserManagement.service;

import com.example.UserManagement.exception.UserAlreadyExistsException;
import com.example.UserManagement.model.AdditionalUserInfo.Address;
import com.example.UserManagement.model.Role;
import com.example.UserManagement.model.Users.Doctor;
import com.example.UserManagement.model.Users.User;
import com.example.UserManagement.model.VerificationToken;
import com.example.UserManagement.repo.DoctorRepo;
import com.example.UserManagement.repo.UserRepo;
import com.example.UserManagement.repo.VerificationTokenRepo;
import com.example.UserManagement.request.DoctorRegisterRequest;
import com.example.UserManagement.request.RegisterRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{

    private final UserRepo userRepo;
    private final DoctorRepo doctorRepo;
    private final VerificationTokenRepo verificationTokenRepo;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender; // Inject JavaMailSender for email functionality


    @Override
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    @Override
    public User registerUser(RegisterRequest request) {

        Optional<User> user = userRepo.findByEmail(request.getEmail());
        if(user.isPresent()){
            throw new UserAlreadyExistsException("User with email " + request.getEmail() + "already exists");
        }
        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setRole(Role.valueOf(request.getRole()));
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setContactNo(request.getContactNo());
        newUser.setAddress(new Address(
                request.getAddress().getStreet(),
                request.getAddress().getCity(),
                request.getAddress().getState(),
                request.getAddress().getZipcode(),
                request.getAddress().getCountry()
        ));
        return userRepo.save(newUser);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public String validateToken(String token) {
        VerificationToken verificationToken = verificationTokenRepo.findByToken(token);
        if (verificationToken == null){
            return "Invalid verification token";
        }
        User user = verificationToken.getUser();
        Calendar calendar = Calendar.getInstance();
        if (verificationToken.getExpirationTime().getTime()-calendar.getTime().getTime()<=0){
            verificationTokenRepo.delete(verificationToken);
            return "Token already expired";
        }
        user.setEnabled(true);
        userRepo.save(user) ;
        return "Valid";
    }

    @Override
    public VerificationToken generateNewVerificationToken(String oldToken) {
        VerificationToken verificationToken = verificationTokenRepo.findByToken(oldToken);
        VerificationToken tokenExpirationTime = new VerificationToken();

        verificationToken.setToken(UUID.randomUUID().toString());
        verificationToken.setExpirationTime(tokenExpirationTime.getExpirationTime());
        return verificationTokenRepo.save(verificationToken);
    }

    public Doctor registerDoctor(DoctorRegisterRequest request) {
        // Create doctor entity
        Doctor doctor = new Doctor();
        doctor.setFirstName(request.getFirstName());
        doctor.setLastName(request.getLastName());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setLicenseNumber(request.getLicenseNumber());

        // Save doctor entity
        Doctor savedDoctor = doctorRepo.save(doctor);

        // Generate system credentials for doctor login
        String systemGeneratedEmail = request.getFirstName().toLowerCase() + "." + request.getLastName().toLowerCase() + "@hospital.com";
        String systemGeneratedPassword = UUID.randomUUID().toString().substring(0, 8);

        // Register the doctor as a user with system-generated credentials
        User user = new User();
        user.setEmail(systemGeneratedEmail);
        user.setPassword(passwordEncoder.encode(systemGeneratedPassword));
        user.setRole(Role.DOCTOR);
        user.setEnabled(true); // Doctors are enabled immediately
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setDoctor(savedDoctor);

        userRepo.save(user);

        // Send the credentials to the doctor's email
        try {
            sendDoctorCredentialsEmail(user.getEmail(), systemGeneratedPassword);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException("Failed to send credentials email to doctor", e);
        }

        return savedDoctor;
    }

    private void sendDoctorCredentialsEmail(String doctorEmail, String password) throws MessagingException, UnsupportedEncodingException {
        String subject = "Your System-Generated Login Credentials";
        String senderName = "Hospital Management System";
        String mailContent = "<p>Dear Doctor,</p>"
                + "<p>Your account has been created successfully in our Hospital Management System. Below are your login credentials:</p>"
                + "<p><strong>Email:</strong> " + doctorEmail + "</p>"
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

    public void saveUserVerification(User user, String token){
        VerificationToken verificationToken = new VerificationToken(user,token);
        verificationTokenRepo.save(verificationToken);
    }
}
