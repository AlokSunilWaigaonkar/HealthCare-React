package com.example.UserManagement.service;


import com.example.UserManagement.model.AuthResponse;
import com.example.UserManagement.model.Enums.Role;
import com.example.UserManagement.config.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;

    public AuthResponse login(String email, String password) {
        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        // Set the authentication in the security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtTokenUtil.generateToken(email);
        String refreshToken = jwtTokenUtil.generateRefreshToken(email);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(accessToken);
        authResponse.setRefreshToken(refreshToken);

        authResponse.setRole(Role.valueOf(authentication.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("PATIENT")));

        return authResponse;
    }
}
