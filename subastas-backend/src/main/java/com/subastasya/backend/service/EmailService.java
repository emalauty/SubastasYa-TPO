package com.subastasya.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendActivationEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setTo(to); 
        message.setSubject("SubastasYa - Tu cuenta ha sido validada"); 
        message.setText("¡Hola!\n\n" +
                "Buenas noticias, tus datos han sido revisados y validados por nuestro equipo.\n\n" +
                "Para activar tu cuenta y configurar tu contraseña, ingresá a la app, ve a la sección 'Activar Cuenta' " +
                "y pegá el siguiente código de activación:\n\n" +
                token + "\n\n" +
                "¡Te esperamos en las subastas!\n" +
                "El equipo de Sello.");
        
        emailSender.send(message);
    }
}
