package com.galvez.dariospainting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.galvez.dariospainting.service.EmailService;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-confirmation-email")
    public void sendConfirmationEmail(@RequestBody EmailRequest emailRequest) {
        emailService.sendConfirmationEmail(emailRequest.getEmail(), emailRequest.getConfirmationCode());
    }

    public static class EmailRequest {
        private String email;
        private String confirmationCode;

        // Getters and setters
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getConfirmationCode() {
            return confirmationCode;
        }

        public void setConfirmationCode(String confirmationCode) {
            this.confirmationCode = confirmationCode;
        }
    }
    
}
