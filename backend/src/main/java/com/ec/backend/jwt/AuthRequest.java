package com.ec.backend.jwt;

import lombok.Data;

@Data
public class AuthRequest {
    public String email;
    public String password;

    public String getEmail(){
        return email;
    }

    public String getPassword(){
        return password;
    }
}
