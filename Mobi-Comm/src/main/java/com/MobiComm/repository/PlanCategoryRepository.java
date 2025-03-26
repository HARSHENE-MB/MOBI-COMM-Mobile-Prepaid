package com.MobiComm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.MobiComm.model.PlanCategory;

@Repository
public interface PlanCategoryRepository extends JpaRepository<PlanCategory, Integer> {
}