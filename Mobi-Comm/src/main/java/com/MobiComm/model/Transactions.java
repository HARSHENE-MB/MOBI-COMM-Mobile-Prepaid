package com.MobiComm.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "transactions")
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "recharge_id")
    private Recharge recharge;

    private Double price;
    private String paymentMethod; // "Credit Card", "UPI", etc.
    private String status = "Pending"; // Default: Pending
    private LocalDateTime timestamp;

    // Default Constructor
    public Transactions() {}

    // Parameterized Constructor
    public Transactions(Integer paymentId, Users user, Recharge recharge, Double price, String paymentMethod, String status, LocalDateTime timestamp) {
        this.paymentId = paymentId;
        this.user = user;
        this.recharge = recharge;
        this.price= price;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public Integer getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Integer paymentId) {
        this.paymentId = paymentId;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Recharge getRecharge() {
        return recharge;
    }

    public void setRecharge(Recharge recharge) {
        this.recharge = recharge;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    // toString() Method
    @Override
    public String toString() {
        return "Transactions{" +
                "paymentId=" + paymentId +
                ", user=" + user +
                ", recharge=" + recharge +
                ", price=" + price +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", status='" + status + '\'' +
                ", timestamp='" + timestamp + '\'' +
                '}';
    }

	
}
