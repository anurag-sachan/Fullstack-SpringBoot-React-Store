package com.ec.backend.config;

import com.ec.backend.jwt.JwtAuthFilter;
import com.ec.backend.user.User;
import com.ec.backend.user.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.ec.backend.user.Permission.ADMIN_POST;
import static com.ec.backend.user.Role.ADMIN;

@Configuration
@AllArgsConstructor
//@EnableMethodSecurity
public class WebSecurityConfig {

    private UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userService);
        authenticationProvider.setPasswordEncoder(passwordEncoder.bCryptPasswordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)throws Exception{
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf-> csrf.disable())
                .sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth-> auth
                        .requestMatchers("/products/all","/registration","/login",
                                "/user",
                                "/cart")
                                .permitAll()
                        .requestMatchers(HttpMethod.POST,"/products").hasRole(ADMIN.name())
                        .requestMatchers(HttpMethod.GET, "/users/list").hasRole(ADMIN.name())
//                        .requestMatchers("/users").hasRole(ADMIN.name()) //or hasAnyRole
//                        .requestMatchers(HttpMethod.POST,"/products").hasAuthority(ADMIN_POST.name()) //for specific permission

                        .anyRequest().authenticated()
                )
                .authenticationProvider(daoAuthenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//                .httpBasic(Customizer.withDefaults())
//                .formLogin(Customizer.withDefaults());

        return http.build();
    }
}
