package com.MobiComm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.MobiComm.model.Users;
import com.MobiComm.repository.UsersRepository;
import com.MobiComm.security.JwtUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Map<String, String> login(String phoneNumber, String password) {
        Optional<Users> user = usersRepository.findByPhoneNumber(phoneNumber);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            String accessToken = jwtUtil.generateAccessToken(phoneNumber);
            String refreshToken = jwtUtil.generateRefreshToken(phoneNumber);
            Map<String, String> tokens = new HashMap<>();
            tokens.put("accessToken", accessToken);
            tokens.put("refreshToken", refreshToken);
            return tokens;
        }
        throw new RuntimeException("Invalid credentials");
    }

    public String refreshToken(String refreshToken) {
        if (jwtUtil.validateToken(refreshToken)) {
            String phoneNumber = jwtUtil.extractPhoneNumber(refreshToken);
            return jwtUtil.generateAccessToken(phoneNumber);
        }
        throw new RuntimeException("Invalid refresh token");
    }
}
