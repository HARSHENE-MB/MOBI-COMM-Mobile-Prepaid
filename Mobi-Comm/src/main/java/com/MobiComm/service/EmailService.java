package com.MobiComm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    public void sendOtpEmail(String to, String otp) {
        String subject = "Your Mobicomm OTP Code";
        String body = "Your OTP for MobiComm login is: " + otp + 
                      ". This OTP is valid for 5 minutes.";
        sendEmail(to, subject, body);
    }
}



//    @Autowired
//    private JavaMailSender mailSender;
//
//    public void sendRechargeReminder(String email, String fullName, String phoneNumber) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(email);
//        message.setSubject("Recharge Reminder - MobiComm");
//        message.setText("Dear " + fullName + ",\n\nYour prepaid plan is expiring soon. Please recharge your number (" + phoneNumber + ") to avoid service interruption.\n\nThank you for choosing MobiComm.");
//
//        mailSender.send(message);
//    }

