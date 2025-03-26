package com.MobiComm.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {
    private static final Logger logger = LoggerFactory.getLogger(OtpService.class);

    @Value("${otp.expiry.seconds:300}") // Default: 5 minutes
    private int otpExpirySeconds;

    @Value("${otp.request.limit:3}") // Max OTP requests per user
    private int otpRequestLimit;

    private final Map<String, OtpEntry> otpStorage = new ConcurrentHashMap<>();
    private final Map<String, Integer> otpRequestCount = new ConcurrentHashMap<>();

    @Autowired
    private EmailService emailService;

    private static class OtpEntry {
        String otp;
        Instant timestamp;

        OtpEntry(String otp) {
            this.otp = otp;
            this.timestamp = Instant.now();
        }
    }

    
    public String generateOTP(String email) {
        int requestCount = otpRequestCount.getOrDefault(email, 0);
        if (requestCount >= otpRequestLimit) {
            logger.warn("OTP request limit reached for {}", email);
            throw new RuntimeException("Too many OTP requests. Please try again later.");
        }

        // Generate 4-digit OTP
        String otp = String.valueOf(1000 + new Random().nextInt(9000));
        otpStorage.put(email, new OtpEntry(otp));
        otpRequestCount.put(email, requestCount + 1);

        // Send OTP via email
        sendOtpEmail(email, otp);

        logger.info("Generated OTP for {}: {}", email, otp);
        return otp;
    }

   
    public boolean sendOtpEmail(String email, String otp) {
        String subject = "Your Mobicomm OTP Code";
        String body = "Your OTP for MobiComm login is: " + otp + ". This OTP is valid for " + otpExpirySeconds / 60 + " minutes.";

        try {
            emailService.sendEmail(email, subject, body);
            logger.info("OTP sent successfully to {}", email);
            return true;
        } catch (Exception e) {
            logger.error("Failed to send OTP email to {}: {}", email, e.getMessage());
            return false;
        }
    }

    /**
     * Retrieves the stored OTP if it has not expired.
     */
    public String getStoredOTP(String email) {
        OtpEntry otpEntry = otpStorage.get(email);
        if (otpEntry != null) {
            if (Instant.now().isBefore(otpEntry.timestamp.plusSeconds(otpExpirySeconds))) {
                return otpEntry.otp;
            } else {
                clearOTP(email); // Remove expired OTP
            }
        }
        return null;
    }

    /**
     * Validates the OTP entered by the user.
     */
    public boolean isOtpValid(String email, String enteredOtp) {
        String storedOtp = getStoredOTP(email);
        boolean isValid = storedOtp != null && storedOtp.equals(enteredOtp);

        if (isValid) {
            clearOTP(email);
        }
        return isValid;
    }

    /**
     * Removes an OTP after successful validation or expiry.
     */
    public void clearOTP(String email) {
        otpStorage.remove(email);
        otpRequestCount.remove(email);
    }

    /**
     * Periodic cleanup of expired OTPs (Runs every 5 minutes).
     */
    @Scheduled(fixedRate = 300000) // 5 minutes
    public void cleanExpiredOtps() {
        otpStorage.entrySet().removeIf(entry ->
            Instant.now().isAfter(entry.getValue().timestamp.plusSeconds(otpExpirySeconds))
        );
        logger.info("Expired OTPs cleaned up.");
    }
}
