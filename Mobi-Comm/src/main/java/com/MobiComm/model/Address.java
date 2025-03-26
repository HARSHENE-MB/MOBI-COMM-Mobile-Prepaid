package com.MobiComm.model;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
public class Address {
    private String street;
    private String city;
    private String state;
    private String country;
    private String pinCode;
    
    
	public Address() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public Address(String street, String city, String state, String country, String pinCode) {
		super();
		this.street = street;
		this.city = city;
		this.state = state;
		this.country = country;
		this.pinCode = pinCode;
	}


	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getPinCode() {
		return pinCode;
	}
	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}


	@Override
	public String toString() {
		return "Address [street=" + street + ", city=" + city + ", state=" + state + ", country=" + country
				+ ", pinCode=" + pinCode + "]";
	} 
	
    
}

