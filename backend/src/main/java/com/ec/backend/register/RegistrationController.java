package com.ec.backend.register;

import com.ec.backend.user.User;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class RegistrationController {
    private RegistrationService registrationService;
    @PostMapping("/registration")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String register(@RequestBody User user){
        return registrationService.register(user);
    }

    @GetMapping("/users/list")
    public List<User> getAllUsers(){ return registrationService.getAllUsers(); }
}
