package com.ec.backend.user;

import com.ec.backend.config.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepo.findByEmail(email);
    }

    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    public String register(User user){
        if(userRepo.findByEmail(user.getEmail())!=null){
            return "email already exists";
        }

        if(user.getRole()==Role.ADMIN){
            user.setRole(Role.ADMIN);
        }
        else user.setRole(Role.USER);

        user.setPassword(passwordEncoder.bCryptPasswordEncoder().encode(user.getPassword()));
        userRepo.save(user);

//        return jwtService.generateToken(user.getUsername());

//        return AuthResponse.builder()
//                .token(jwtToken)
//                .build();

        return "new user registered";
    }
}