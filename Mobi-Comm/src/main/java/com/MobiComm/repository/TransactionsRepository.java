package com.MobiComm.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.MobiComm.model.Transactions;

import java.util.List;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, Integer> {
    
    // Find transactions by user ID
    List<Transactions> findByUser_UserId(Integer userId);
    
    // Find transactions by status (e.g., "Completed", "Pending", "Failed")
    List<Transactions> findByStatus(String status);
}