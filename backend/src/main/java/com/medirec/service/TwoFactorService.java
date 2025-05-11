package com.medirec.service;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import org.springframework.stereotype.Service;

@Service
public class TwoFactorService {

    private final GoogleAuthenticator gAuth = new GoogleAuthenticator();

    /**
     * Generates a new secret key for 2FA.
     */
    public String generateSecretKey() {
        GoogleAuthenticatorKey key = gAuth.createCredentials();
        return key.getKey();
    }

    /**
     * Returns the QR code URL for provisioning in an authenticator app.
     */
    public String getQRBarcodeURL(String user, String secret) {
        String issuer = "MedRec";
        return String.format(
            "otpauth://totp/%s:%s?secret=%s&issuer=%s",
            issuer, user, secret, issuer
        );
    }

    /**
     * Validates a TOTP code.
     */
    public boolean validateCode(String secret, int code) {
        return gAuth.authorize(secret, code);
    }
} 