package com.medirec.controller;

import com.medirec.dto.LoginRequest;
import com.medirec.dto.LoginResponse;
import com.medirec.dto.SignupRequest;
import com.medirec.dto.SignupResponse;
import com.medirec.service.AuthService;
import com.medirec.service.TwoFactorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private TwoFactorService twoFactorService;

    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest req) {
        SignupResponse resp = authService.signup(req);
        if (resp.getUuid() == null && "Email already in use".equals(resp.getMessage())) {
            return ResponseEntity.status(409).body(resp); // 409 Conflict
        }
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req) {
        LoginResponse resp = authService.login(req);
        return ResponseEntity.ok(resp);
    }

    /**
     * Initialize 2FA for the current user: generate secret and QR code URL.
     */
    @GetMapping("/2fa/setup")
    public ResponseEntity<Map<String,String>> setup2fa(Authentication authentication) {
        String email = authentication.getName();
        String secret = twoFactorService.generateSecretKey();
        String qrUrl = twoFactorService.getQRBarcodeURL(email, secret);
        authService.updateTwoFactorSecret(email, secret);
        return ResponseEntity.ok(Map.of("secret", secret, "qrUrl", qrUrl));
    }

    /**
     * Verify TOTP code and enable 2FA for the user.
     */
    @PostMapping("/2fa/verify")
    public ResponseEntity<Map<String,String>> verify2fa(@RequestBody Map<String,String> body) {
        String email = body.get("email");
        int code = Integer.parseInt(body.get("code"));
        boolean valid = twoFactorService.validateCode(authService.getTwoFactorSecret(email), code);
        if (!valid) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid 2FA code"));
        }
        authService.enableTwoFactor(email);
        return ResponseEntity.ok(Map.of("message", "2FA enabled successfully"));
    }
} 