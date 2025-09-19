package com.ec.backend.login;

import com.ec.backend.config.PasswordEncoder;
import com.ec.backend.email.EmailValidator;
import com.ec.backend.jwt.AuthRequest;
import com.ec.backend.jwt.JwtService;
import com.ec.backend.user.User;
import com.ec.backend.user.UserRepo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
@AllArgsConstructor
public class LoginService {
    private UserRepo userRepo;
    private EmailValidator emailValidator;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;

    @PostMapping("/login")
    public String loginAndGetToken(AuthRequest authRequest) {
//        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
//        if(authentication.isAuthenticated()){
//            User user = userRepo.findByEmail(authRequest.getEmail());
//            return jwtService.generateToken(user.getEmail());
//        }else {
//            throw new UsernameNotFoundException("invalid user request !");



//        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
//        User user= userRepo.findByEmail(authRequest.getEmail());
//        return jwtService.generateToken(user.getUsername());


//    public AuthResponse login(AuthRequest authRequest) {
//        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
//        String jwtToken= jwtService.generateToken(authRequest.getEmail());
//        return  AuthResponse.builder().token(jwtToken).build();



        if(!emailValidator.test(authRequest.getEmail())){
            return ("Invalid email");
        }

        User tempUser = userRepo.findByEmail(authRequest.getEmail());

        if (passwordEncoder.bCryptPasswordEncoder().matches(authRequest.getPassword(), tempUser.getPassword())) {
            return jwtService.generateToken(tempUser.getUsername());
        }
        return ("Invalid Credentials");
    }
}