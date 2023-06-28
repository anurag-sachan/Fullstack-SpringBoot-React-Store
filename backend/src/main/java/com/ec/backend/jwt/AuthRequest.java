package com.ec.backend.jwt;

import lombok.Data;

@Data
public class AuthRequest {
    public String email;
    public String password;
}
