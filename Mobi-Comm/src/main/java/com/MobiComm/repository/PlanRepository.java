package com.MobiComm.repository;

import com.MobiComm.model.Plan;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Integer> {
	
	
	List<Plan> findByCategory_CategoryNameIgnoreCase(String categoryName);
	
//	@Query("SELECT p FROM Plan p LEFT JOIN p.category c WHERE " +
//		       "(c.name IS NOT NULL AND LOWER(c.name) LIKE LOWER(CONCAT('%', :searchQuery, '%'))) OR " +
//		       "LOWER(p.benefits) LIKE LOWER(CONCAT('%', :searchQuery, '%')) OR " +
//		       "LOWER(p.description) LIKE LOWER(CONCAT('%', :searchQuery, '%')) OR " +
//		       "LOWER(p.data) LIKE LOWER(CONCAT('%', :searchQuery, '%')) OR " +
//		       "CAST(p.price AS string) LIKE CONCAT('%', :searchQuery, '%')")
//		List<Plan> searchPlans(@Param("searchQuery") String searchQuery);
//



}