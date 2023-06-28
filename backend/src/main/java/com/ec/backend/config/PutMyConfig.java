//package com.ec.backend.config;
//
//import com.ec.backend.user.User;
//import com.ec.backend.user.UserRepo;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//@Configuration
//public class PutMyConfig {
//    @Bean
//    CommandLineRunner commandLineRunner(UserRepo userRepo){
//        return args -> {
//            //test-users
//            User u1 = new User(
//                    "anurag",
//                    "sachan",
//                    "anuragsachan@gmail.com",
//                    new BCryptPasswordEncoder().encode("password"),
//                    "ADMIN"
//            );
//            userRepo.save(u1);
//
//            User u2 = new User(
//                    "psych",
//                    "0x00",
//                    "psycho@gmail.com",
//                    new BCryptPasswordEncoder().encode("password"),
//                    "USER"
//            );
//            userRepo.save(u2);
//        };
//    }
//}
