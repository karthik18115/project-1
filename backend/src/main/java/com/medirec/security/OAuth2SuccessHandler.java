package com.medirec.security;

import com.medirec.entity.User;
import com.medirec.repository.UserRepository;
import com.medirec.security.JwtUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    public OAuth2SuccessHandler(UserRepository userRepository, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauthUser = authToken.getPrincipal();
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        // Register user if not exists
        Optional<User> userOpt = userRepository.findByEmail(email);
        User user;
        if (userOpt.isEmpty()) {
            user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPassword(""); // No password
            user.setRoles(Collections.singleton("PATIENT")); // Default role
            userRepository.save(user);
        } else {
            user = userOpt.get();
        }

        // Generate JWT for user
        String token = jwtUtils.generateJwtToken(authentication);

        // Redirect to front-end with token
        String redirectUrl = "http://localhost:3000/oauth2/redirect?token=" + token;
        response.sendRedirect(redirectUrl);
    }
} 