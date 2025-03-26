package com.MobiComm.controller;

import com.MobiComm.model.Transactions;
import com.MobiComm.model.Users;
import com.MobiComm.service.TransactionsService;
import com.MobiComm.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UsersController {

    @Autowired
    private UsersService usersService;
    
    @Autowired
    private TransactionsService transactionsService;

    @GetMapping
    public List<Users> getAllUsers() {
        return usersService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable Integer id) {
        Optional<Users> user = usersService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Users createUser(@RequestBody Users user) {
        return usersService.createUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable Integer id, @RequestBody Users userDetails) {
        try {
            Users updatedUser = usersService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        usersService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    
//    @PostMapping("/send-email")
//    public ResponseEntity<?> sendRechargeReminder(@RequestBody Map<String, String> request) {
//        try {
//            String email = request.get("email");
//            String fullName = request.get("fullName");
//            String phoneNumber = request.get("phoneNumber");
//
//            emailService.sendRechargeReminder(email, fullName, phoneNumber);
//            return ResponseEntity.ok(Collections.singletonMap("success", true));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("success", false));
//        }
//    }

    
    
    //transaction
    @GetMapping("/{id}/details")
    public ResponseEntity<?> getUserDetails(@PathVariable Integer id) {
        Optional<Users> user = usersService.getUserById(id);
        if (user.isPresent()) {
            List<Transactions> transactions = transactionsService.getTransactionsByUserId(id);  
            Map<String, Object> response = new HashMap<>();
            response.put("user", user.get());
            response.put("transactions", transactions);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }
    
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Users> updateUserStatus(@PathVariable Integer id, @RequestBody Map<String, String> request) {
        String newStatus = request.get("status");
        
        try {
            Users updatedUser = usersService.updateUserStatus(id, newStatus);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    

   
}