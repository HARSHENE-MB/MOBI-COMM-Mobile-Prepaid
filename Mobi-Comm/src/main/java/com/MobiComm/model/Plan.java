package com.MobiComm.model;

import jakarta.persistence.*;

@Entity
@Table(name = "plans")
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer planId;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private PlanCategory category;

    @Column(nullable = false, length = 20)  
    private String validity;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String data;

    @Column(nullable = false)
    private String benefits;

    @Column(nullable = false)
    private Boolean bestseller;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    // Getters and Setters
    public Integer getPlanId() {
        return planId;
    }

    public void setPlanId(Integer planId) {
        this.planId = planId;
    }

    public PlanCategory getCategory() {
        return category;
    }

    public void setCategory(PlanCategory category) {
        this.category = category;
    }

    public String getValidity() {
        return validity;
    }

    public void setValidity(String validity) {
        this.validity = validity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getBenefits() {
        return benefits;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }

    public Boolean getBestseller() {
        return bestseller;
    }

    public void setBestseller(Boolean bestseller) {
        this.bestseller = bestseller;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
