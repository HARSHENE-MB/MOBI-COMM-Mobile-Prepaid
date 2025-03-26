package com.MobiComm.service;

import com.MobiComm.model.Plan;
import com.MobiComm.model.Recharge;
import com.MobiComm.model.Transactions;
import com.MobiComm.model.Users;
import com.MobiComm.repository.PlanRepository;
import com.MobiComm.repository.RechargeRepository;
import com.MobiComm.repository.TransactionsRepository;
import com.MobiComm.repository.UsersRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RechargeService {

    @Autowired
    private RechargeRepository rechargeRepository;

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private TransactionsRepository transactionsRepository;

    @Autowired
    private PlanRepository planRepository;

    public List<Recharge> getAllRecharges() {
        return rechargeRepository.findAll();
    }

    public Optional<Recharge> getRechargeById(Integer id) {
        return rechargeRepository.findById(id);
    }

    public List<Recharge> getRechargesByUserId(Integer userId) {
        return rechargeRepository.findByUser_UserId(userId);
    }

    public List<Recharge> getRechargesByPlanId(Integer planId) {
        return rechargeRepository.findByPlan_PlanId(planId);
    }

    public Recharge createRecharge(Recharge recharge) {
        return rechargeRepository.save(recharge);
    }

    public void deleteRecharge(Integer id) {
        rechargeRepository.deleteById(id);
    }

    public static long extractDays(String validity) {

		String number = validity.replaceAll("[^0-9]", "");
		return Long.parseLong(number);
	} 
    
    // Method to process recharge and save it
    @Transactional
    public Recharge processRecharge(Integer userId, Integer planId, String paymentMethod) {
        LocalDateTime now = LocalDateTime.now();
        

        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found"));
        
        LocalDateTime expiryDate = now.plusDays(extractDays(plan.getValidity()));

        // Step 1: Create new Recharge
        Recharge newRecharge = new Recharge();
        newRecharge.setUser(user);
        newRecharge.setPlan(plan);
        newRecharge.setRechargeDate(now);  
        newRecharge.setExpiryDate(expiryDate); 

        Recharge savedRecharge = rechargeRepository.save(newRecharge);

        // Step 2: Insert into Transactions table
        Transactions transaction = new Transactions();
        transaction.setPrice(plan.getPrice());  
        transaction.setPaymentMethod(paymentMethod);
        transaction.setStatus("SUCCESS");
        transaction.setTimestamp(now);  
        transaction.setRecharge(savedRecharge); 
        transaction.setUser(user);

        transactionsRepository.save(transaction);

        return savedRecharge;
    }
}
