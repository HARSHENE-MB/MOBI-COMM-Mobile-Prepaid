package com.MobiComm.controller;

import com.MobiComm.exception.InvalidCredentialsException;
import com.MobiComm.exception.NotAdminException;
import com.MobiComm.exception.UserNotFoundException;
import com.MobiComm.model.Users;
import com.MobiComm.service.UsersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminLoginController {

    private final UsersService userService;

    public AdminLoginController(UsersService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> adminLogin(@RequestParam String username, @RequestParam String password) {
        // Validate user existence
        Users user = userService.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found!"));

        // Validate password
        if (!user.getPassword().equals(password)) {
            throw new InvalidCredentialsException("Incorrect password!");
        }

        // Validate admin role
        if (user.getRole().getRoleId() != 1) {
            throw new NotAdminException("Access denied! Not an admin.");
        }

        return ResponseEntity.ok("Login Successful!"); // JWT token can be returned here
    }
}
