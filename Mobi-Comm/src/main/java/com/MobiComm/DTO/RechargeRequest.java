package com.MobiComm.DTO;

public class RechargeRequest {
    private Integer userId;
    private Integer planId;
    private Integer validity;
    private Double price;
    private String paymentMethod;

    // Default Constructor
    public RechargeRequest() {
    }

    // Parameterized Constructor
    public RechargeRequest(Integer userId, Integer planId, Integer validity, Double price, String paymentMethod) {
        this.userId = userId;
        this.planId = planId;
//        this.validity = validity;
//        this.price = price;
        this.paymentMethod = paymentMethod;
    }

    // Getters and Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getPlanId() {
        return planId;
    }

    public void setPlanId(Integer planId) {
        this.planId = planId;
    }

//    public Integer getValidity() {
//        return validity;
//    }
//
//    public void setValidity(Integer validity) {
//        this.validity = validity;
//    }
//
//    public Double getPrice() {
//        return price;
//    }
//
//    public void setPrice(Double price) {
//        this.price = price;
//    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    // toString() Method
    @Override
    public String toString() {
        return "RechargeRequest{" +
                "userId=" + userId +
                ", planId=" + planId +
                ", validity=" + validity +
                ", price=" + price +
                ", paymentMethod='" + paymentMethod + '\'' +
                '}';
    }
}
