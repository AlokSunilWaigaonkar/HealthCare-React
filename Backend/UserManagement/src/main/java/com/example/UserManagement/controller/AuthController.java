package com.example.UserManagement.controller;

import com.example.UserManagement.config.JwtTokenUtil;
import com.example.UserManagement.config.UserRegistrationDetailsService;
import com.example.UserManagement.model.AuthResponse;
import com.example.UserManagement.model.Users.User;
import com.example.UserManagement.model.VerificationToken;
import com.example.UserManagement.repo.VerificationTokenRepo;
import com.example.UserManagement.request.LoginRequest;
import com.example.UserManagement.request.RefreshTokenRequest;
import com.example.UserManagement.response.ApiResponseDTO;
import com.example.UserManagement.service.LoginService;
import com.example.UserManagement.service.RefreshTokenService;
import com.example.UserManagement.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final LoginService loginService;
    private final UserService userService;
    private final VerificationTokenRepo verificationTokenRepo;
    private final RegistrationController registrationController;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserRegistrationDetailsService userRegistrationDetailsService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDTO<AuthResponse>> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request)
            throws MessagingException, UnsupportedEncodingException {
        try {
            AuthResponse response = loginService.login(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(new ApiResponseDTO<>("Login successful", true, response));
        } catch (DisabledException e) {
            User user = userService.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (user != null && !user.isEnabled()) {
                VerificationToken oldToken = verificationTokenRepo.findByUserId(user.getId());
                registrationController.resendVerificationToken(oldToken.getToken(), request);
                System.out.println("Verification email re-sent: " + oldToken);
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponseDTO<>("Account not verified. A new verification email has been sent.", false, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDTO<>("Login failed due to an internal error: " + e.getMessage(), false, null));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponseDTO<Void>> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        String token = extractJwtFromRequest(request);
        String email = jwtTokenUtil.getUsernameFromToken(token);
        // You may blacklist the token here if required
        refreshTokenService.deleteToken(email);

        return ResponseEntity.ok(new ApiResponseDTO<>("User with email "+ email +" logged out successfully", true, null));
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();

        String email = jwtTokenUtil.getUsernameFromToken(refreshToken);
        if (email == null || !jwtTokenUtil.validateToken(refreshToken, userRegistrationDetailsService.loadUserByUsername(email))) {
            throw new RuntimeException("Invalid refresh token");
        }

        // Optionally check from DB if token is valid
        if (!refreshTokenService.isTokenValid(email, refreshToken)) {
            throw new RuntimeException("Refresh token invalidated");
        }

        String newAccessToken = jwtTokenUtil.generateToken(email);
        return ResponseEntity.ok(new AuthResponse(newAccessToken, refreshToken,null));
    }
}