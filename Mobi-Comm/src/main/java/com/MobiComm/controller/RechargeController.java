package com.MobiComm.controller;

import com.MobiComm.DTO.RechargeRequest;
import com.MobiComm.model.Recharge;
import com.MobiComm.service.RechargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recharges")
public class RechargeController {

    @Autowired
    private RechargeService rechargeService;

    @GetMapping
    public List<Recharge> getAllRecharges() {
        return rechargeService.getAllRecharges();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recharge> getRechargeById(@PathVariable Integer id) {
        Optional<Recharge> recharge = rechargeService.getRechargeById(id);
        return recharge.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Recharge> getRechargesByUserId(@PathVariable Integer userId) {
        return rechargeService.getRechargesByUserId(userId);
    }

    @GetMapping("/plan/{planId}")
    public List<Recharge> getRechargesByPlanId(@PathVariable Integer planId) {
        return rechargeService.getRechargesByPlanId(planId);
    }

    @PostMapping
    public Recharge createRecharge(@RequestBody Recharge recharge) {
        return rechargeService.createRecharge(recharge);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecharge(@PathVariable Integer id) {
        rechargeService.deleteRecharge(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/process")
    public ResponseEntity<?> processRecharge(@RequestBody RechargeRequest request) {
        try {
            Recharge recharge = rechargeService.processRecharge(
                request.getUserId(),
                request.getPlanId(),
                request.getPaymentMethod()
            );

            return ResponseEntity.ok(recharge);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}
