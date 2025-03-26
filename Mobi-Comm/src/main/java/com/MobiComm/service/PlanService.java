package com.MobiComm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.MobiComm.model.Plan;
import com.MobiComm.repository.PlanRepository;
import java.util.List;
import java.util.Optional;

@Service
public class PlanService {

    @Autowired
    private PlanRepository planRepository;

    public Plan createPlan(Plan plan) {
        return planRepository.save(plan);
    }

    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }

    public Optional<Plan> getPlanById(Integer id) {
        return planRepository.findById(id);
    }

    public Optional<Plan> updatePlan(Integer id, Plan updatedPlan) {
        return planRepository.findById(id).map(existingPlan -> {
            existingPlan.setValidity(updatedPlan.getValidity());
            existingPlan.setCategory(updatedPlan.getCategory());
            existingPlan.setPrice(updatedPlan.getPrice());
            existingPlan.setData(updatedPlan.getData());
            existingPlan.setBenefits(updatedPlan.getBenefits());
            existingPlan.setBestseller(updatedPlan.getBestseller());
            existingPlan.setDescription(updatedPlan.getDescription());
            return planRepository.save(existingPlan);
        });
    }

    public boolean deletePlan(Integer id) {
        if (planRepository.existsById(id)) {
            planRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Plan> getPlansByCategory(String categoryName) {
        return planRepository.findByCategory_CategoryNameIgnoreCase(categoryName);
    }
    
//    public List<Plan> searchPlans(String query) {
//        return planRepository.searchPlans(query);
//    }
    
    
}
