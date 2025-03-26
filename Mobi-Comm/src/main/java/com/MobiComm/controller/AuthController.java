package com.MobiComm.controller;

import com.MobiComm.service.AuthService;
import com.MobiComm.service.OtpService;
import com.MobiComm.service.EmailService;
import com.MobiComm.repository.UsersRepository;
import com.MobiComm.model.Users;
import com.MobiComm.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UsersRepository userRepository;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        
        if (phoneNumber == null || phoneNumber.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Phone number is required."));
        }

        Optional<Users> userOptional = userRepository.findByPhoneNumber(phoneNumber);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found."));
        }

        Users user = userOptional.get();
        String email = user.getEmail();

        if (email == null || email.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "User email is not set."));
        }

        String otp = otpService.generateOTP(email);
        if (otp == null || otp.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Failed to generate OTP."));
        }

        try {
            emailService.sendOtpEmail(email, otp);
            return ResponseEntity.ok(Map.of("message", "OTP sent successfully to registered email."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Failed to send OTP email.", "error", e.getMessage()));
        }
    }


    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestBody Map<String, String> request) {
        return sendOtp(request);
    }

    @PostMapping("/verifyOTP")
    public ResponseEntity<?> verifyOTP(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        String enteredOTP = request.get("otp");

        if (phoneNumber == null || enteredOTP == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Phone number and OTP are required."));
        }

        Optional<Users> userOptional = userRepository.findByPhoneNumber(phoneNumber);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found."));
        }
        Users user = userOptional.get();
        String email = user.getEmail();

        if (!otpService.isOtpValid(email, enteredOTP)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid or expired OTP."));
        }

        String accessToken = jwtUtil.generateAccessToken(user.getPhoneNumber());
        String refreshToken = jwtUtil.generateRefreshToken(user.getPhoneNumber());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "OTP verified successfully!");
        response.put("userDetails", user);
        response.put("accessToken", accessToken);
        response.put("refreshToken", refreshToken);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        String phoneNumber = jwtUtil.extractPhoneNumber(token.substring(7));
        Optional<Users> userOptional = userRepository.findByPhoneNumber(phoneNumber);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
        }
    }
}
