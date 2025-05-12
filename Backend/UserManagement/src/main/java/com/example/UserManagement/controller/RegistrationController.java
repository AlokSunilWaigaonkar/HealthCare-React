package com.example.UserManagement.controller;

import com.example.UserManagement.event.RegistrationCompletionEvent;
import com.example.UserManagement.event.listener.RegistrationCompletionListener;
import com.example.UserManagement.model.Users.User;
import com.example.UserManagement.model.VerificationToken;
import com.example.UserManagement.repo.VerificationTokenRepo;
import com.example.UserManagement.request.RegisterRequest;
import com.example.UserManagement.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/register")
public class RegistrationController {

    private final UserService userService;
    private final VerificationTokenRepo verificationTokenRepo;
    private final ApplicationEventPublisher eventPublisher;
    private RegistrationCompletionListener eventListener;

    @PostMapping("/registerUser")
    public String registerUser(@RequestBody RegisterRequest registerRequest , final HttpServletRequest request){
        User user = userService.registerUser(registerRequest);
        eventPublisher.publishEvent(new RegistrationCompletionEvent(user,applicationUrl(request)));
        return "Success ! Please,Check your email for verification";
    }

    @GetMapping("/verifyEmail")
    public String verifyEmail(@RequestParam("token") String token){
        VerificationToken verificationToken = verificationTokenRepo.findByToken(token);
        if(verificationToken.getUser().isEnabled()){
            return "This account is already verified , please login";
        }
        String verificationResult = userService.validateToken(token);
        if(verificationResult.equalsIgnoreCase("valid")){
            return "Email verified successfully . Now you can login to your account";
        }
        return "Invalid verification link, please, check your email for new verification link";
    }

    @GetMapping("/resend-verification-token")
    public String resendVerificationToken(@RequestParam("token") String oldToken, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        VerificationToken verificationToken = userService.generateNewVerificationToken(oldToken);
        User user = verificationToken.getUser();
        resendVerificationTokenEmail(user,applicationUrl(request),verificationToken);
        return "A new verification link hs been sent to your email," +
                " please, check to complete your registration";
    }

    public void resendVerificationTokenEmail(User user , String applicationUrl, VerificationToken verificationToken) throws MessagingException, UnsupportedEncodingException {
        String url = applicationUrl+"/register/verifyEmail?token"+verificationToken.getToken();
        eventListener.sendVerificationEmail(user,url);
        log.info("Clicked Link to verify your registration " +url);
    }

    public String applicationUrl(HttpServletRequest request){
        return "http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath();
    }
}
