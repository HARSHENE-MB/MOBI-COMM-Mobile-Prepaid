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
        if (email == null || email.isEmpty()) {
            logger.error("Email is null or empty.");
            throw new IllegalArgumentException("Email is required.");
        }

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
        if (!sendOtpEmail(email, otp)) {
            throw new RuntimeException("Failed to send OTP.");
        }

        logger.info("Generated OTP for {}: {}", email, otp);
        return otp;
    }

    public boolean sendOtpEmail(String email, String otp) {
        String subject = "[MobiComm] Secure OTP Verification";
        String body = "<html><body>"
                + "<h3 style='color: #2c3e50;'>MobiComm Secure OTP Verification</h3>"
                + "<p>Dear User,</p>"
                + "<p>Your One-Time Password (OTP) for secure access is: <strong style='font-size: 18px;'>" + otp + "</strong></p>"
                + "<p>This OTP is valid for <strong>" + otpExpirySeconds / 60 + " minutes</strong>. Do not share this OTP with anyone.</p>"
                + "<hr>"
                + "<p>If you did not request this OTP, please ignore this email or contact our support team immediately.</p>"
                + "<p>Best Regards,<br><strong>MobiComm Support Team</strong></p>"
                + "<p>📧 support@mobicomm.com | ☎ +1-800-123-4567</p>"
                + "</body></html>";

        try {
            emailService.sendEmail(email, subject, body);
            logger.info("OTP email sent successfully to {}", email);
            return true;
        } catch (Exception e) {
            logger.error("Failed to send OTP email to {}: {}", email, e.getMessage());
            return false;
        }
    }

    public boolean isOtpValid(String email, String enteredOtp) {
        OtpEntry otpEntry = otpStorage.get(email);
        if (otpEntry == null) {
            logger.warn("No OTP found for {}", email);
            return false;
        }

        if (Instant.now().isAfter(otpEntry.timestamp.plusSeconds(otpExpirySeconds))) {
            logger.warn("OTP expired for {}", email);
            clearOTP(email);
            return false;
        }

        boolean isValid = otpEntry.otp.equals(enteredOtp);
        if (isValid) {
            clearOTP(email);
        }
        return isValid;
    }

    public void clearOTP(String email) {
        otpStorage.remove(email);
        otpRequestCount.remove(email);
    }

    @Scheduled(fixedRate = 300000) // Runs every 5 minutes
    public void cleanExpiredOtps() {
        otpStorage.entrySet().removeIf(entry ->
            Instant.now().isAfter(entry.getValue().timestamp.plusSeconds(otpExpirySeconds))
        );
        logger.info("Expired OTPs cleaned up.");
    }
}
