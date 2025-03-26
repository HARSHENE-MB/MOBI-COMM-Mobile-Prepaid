package com.MobiComm.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recharges")
public class Recharge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer rechargeId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "plan_id", nullable = false)
    private Plan plan;

    private LocalDateTime rechargeDate;
    private LocalDateTime expiryDate;
	public Recharge(Integer rechargeId, Users user, Plan plan, LocalDateTime rechargeDate, LocalDateTime expiryDate) {
		super();
		this.rechargeId = rechargeId;
		this.user = user;
		this.plan = plan;
		this.rechargeDate = rechargeDate;
		this.expiryDate = expiryDate;
	}
	public Recharge() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Integer getRechargeId() {
		return rechargeId;
	}
	public void setRechargeId(Integer rechargeId) {
		this.rechargeId = rechargeId;
	}
	public Users getUser() {
		return user;
	}
	public void setUser(Users user) {
		this.user = user;
	}
	public Plan getPlan() {
		return plan;
	}
	public void setPlan(Plan plan) {
		this.plan = plan;
	}
	public LocalDateTime getRechargeDate() {
		return rechargeDate;
	}
	public void setRechargeDate(LocalDateTime rechargeDate) {
		this.rechargeDate = rechargeDate;
	}
	public LocalDateTime getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(LocalDateTime expiryDate) {
		this.expiryDate = expiryDate;
	}
    
    
}
