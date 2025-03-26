package com.MobiComm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EntityScan(basePackages = "com.MobiComm.model")  
@ComponentScan(basePackages = "com.MobiComm")    
public class MobiCommApplication {

	public static void main(String[] args) {
		SpringApplication.run(MobiCommApplication.class, args);
	}

}
