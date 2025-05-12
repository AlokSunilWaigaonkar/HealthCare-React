package com.example.UserManagement.event.listener;

import com.example.UserManagement.event.RegistrationCompletionEvent;
import com.example.UserManagement.model.Users.User;
import com.example.UserManagement.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class RegistrationCompletionListener implements ApplicationListener<RegistrationCompletionEvent> {
    private final UserService userService;
    private final JavaMailSender mailSender;


    @Override
    public void onApplicationEvent(RegistrationCompletionEvent event) {
        User user = event.getUser();
        String verificationToken = UUID.randomUUID().toString();
        userService.saveUserVerification(user, verificationToken);
        String url = event.getApplicationUrl() + "/register/verifyEmail?token=" + verificationToken;

        try {
            sendVerificationEmail(user, url);  // Pass user here
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        log.info("Click the link to verify your registration: {}", url);
    }

    public void sendVerificationEmail(User user, String url) throws MessagingException, UnsupportedEncodingException {
        String subject = "Email Verification";
        String senderName = "User Registration Portal Service";
        String mailContent = "<p>Hi " + user.getEmail() + ", </p>" +
                "<p>Thank you for registering with us. " +
                "Please click the link below to complete your registration:</p>" +
                "<a href=\"" + url + "\">Verify your email</a>" +
                "<p>Thank you,<br>User Registration Portal Service</p>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom("shadowforgelab@gmail.com", senderName);
        messageHelper.setTo(user.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);  // true for HTML

        mailSender.send(message);
    }
}
