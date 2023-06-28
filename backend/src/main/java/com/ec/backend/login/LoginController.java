package com.ec.backend.login;

import com.ec.backend.jwt.AuthRequest;
import com.ec.backend.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class LoginController {
    private LoginService loginService;
    private UserService userService;

    @PostMapping("/login")
    public String loginAndGetToken(@RequestBody AuthRequest authRequest){
        return loginService.loginAndGetToken(authRequest);
    }
}
