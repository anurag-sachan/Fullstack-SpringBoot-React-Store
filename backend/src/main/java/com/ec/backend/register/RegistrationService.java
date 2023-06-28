package com.ec.backend.register;

import com.ec.backend.email.EmailValidator;
import com.ec.backend.user.User;
import com.ec.backend.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RegistrationService {
    private UserService userService;
    private EmailValidator emailValidator;

    public String register(User user){
        if(!emailValidator.test(user.getEmail())){
            return "Invalid email";
        }
        return userService.register(user);
    }

    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
