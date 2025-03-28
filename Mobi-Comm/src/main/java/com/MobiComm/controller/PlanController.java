package com.MobiComm.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.MobiComm.model.Plan;
import com.MobiComm.service.PlanService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "*")
public class PlanController {

    @Autowired
    private PlanService planService;

    @PostMapping
    public Plan createPlan(@RequestBody Plan plan) {
        return planService.createPlan(plan);
    }

    @GetMapping
    public List<Plan> getAllPlans() {
        return planService.getAllPlans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plan> getPlanById(@PathVariable Integer id) {
        Optional<Plan> plan = planService.getPlanById(id);
        return plan.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Plan> updatePlan(@PathVariable Integer id, @RequestBody Plan updatedPlan) {
        Optional<Plan> updated = planService.updatePlan(id, updatedPlan);
        return updated.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Integer id) {
        if (planService.deletePlan(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<Plan>> getPlansByCategory(@PathVariable String categoryName) {
        List<Plan> plans = planService.getPlansByCategory(categoryName);
        if (plans.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(plans);
    }
    
//    @GetMapping("/search")
//    public ResponseEntity<List<Plan>> searchPlans(@RequestParam String query) {
//        List<Plan> filteredPlans = planService.searchPlans(query);
//        if (filteredPlans.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(filteredPlans);
//    }
    
    
    
}