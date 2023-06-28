package com.ec.backend.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordEncoder {
    public BCryptPasswordEncoder bCryptPasswordEncoder() { //PasswordEncoder {Parent class}
        return new BCryptPasswordEncoder();
    }
}
