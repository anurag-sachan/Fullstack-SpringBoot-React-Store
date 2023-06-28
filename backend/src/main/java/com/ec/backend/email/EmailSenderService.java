package com.ec.backend.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
    private final static Logger LOGGER = LoggerFactory.getLogger(EmailSenderService.class);
    private JavaMailSender javaMailSender;

    @Async
    public void sendEmail(String to, String email) {
        try{
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setTo(to);
            helper.setText(email, true);
            helper.setSubject("Confirmation email");
            helper.setFrom("connect2anurags@gmail.com");

            javaMailSender.send(mimeMessage);
        }catch (MessagingException e){
            LOGGER.error(e.toString());
            throw  new IllegalStateException("failed to send email");
        }
    }
}
