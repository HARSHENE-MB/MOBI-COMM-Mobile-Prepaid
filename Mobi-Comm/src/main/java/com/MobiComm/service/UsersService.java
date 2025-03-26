package com.MobiComm.service;

import com.MobiComm.model.Users;
import com.MobiComm.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UsersService {
    List<Users> getAllUsers();
    Optional<Users> getUserById(Integer id);
    Users createUser(Users user);
    Users updateUser(Integer id, Users userDetails);
    void deleteUser(Integer id);
    Users updateUserStatus(Integer id, String newStatus);
    Optional<Users> findByUsername(String username);
}

@Service
class UsersServiceImpl implements UsersService {

    private final UsersRepository usersRepository;

    @Autowired
    public UsersServiceImpl(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @Override
    public Optional<Users> getUserById(Integer id) {
        return usersRepository.findById(id);
    }

    @Override
    public Users createUser(Users user) {
        return usersRepository.save(user);
    }

    @Override
    public Users updateUser(Integer id, Users userDetails) {
        return usersRepository.findById(id).map(user -> {
            user.setFullName(userDetails.getFullName());
            user.setPhoneNumber(userDetails.getPhoneNumber());
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            user.setPassword(userDetails.getPassword());
            user.setRole(userDetails.getRole());
            user.setAddress(userDetails.getAddress());
            user.setRegisteredAt(userDetails.getRegisteredAt());
            user.setStatus(userDetails.getStatus());
            user.setProfileImageUrl(userDetails.getProfileImageUrl());
            return usersRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void deleteUser(Integer id) {
        usersRepository.deleteById(id);
    }

    @Transactional
    @Override
    public Users updateUserStatus(Integer id, String newStatus) {
        Users user = usersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus(newStatus);
        return usersRepository.save(user);
    }

    @Override
    public Optional<Users> findByUsername(String username) {
        return usersRepository.findByUsername(username);
    }
}
