package com.ec.backend.user;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Data
@Table(name = "Users")
public class User implements UserDetails {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    @Column(name = "First Name")
    private String firstName;
    @Column(name = "Last Name")
    private String lastName;
    @Column(name = "Email")
    private String email;
    @Column(name = "Password")
    private String password;
    @Column(name = "Role")
    @Enumerated(EnumType.STRING)
    private Role role;

//    public User(String firstName, String lastName, String email, String password, String role) {
//        firstName=this.getFirstName();
//        lastName=this.getLastName();
//        email=this.getEmail();
//        password=this.getPassword();
//        role=this.getRole();
//    }

//    @ManyToMany
//    @JoinTable(name = "user_roles",
//                joinColumns = @JoinColumn(name = "user_id"),
//                inverseJoinColumns = @JoinColumn(name = "role_id"))
//
//    @Column(name = "Role")
//    private List<Role> roles;

//    @Enumerated(EnumType.STRING)
//    @Column(name = "Role")
//    private UserRole userRole;
//    private UserRole userRole=UserRole.USER;
//    private Boolean locked=false;
//    private Boolean enabled=false;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return role.getAuthorities();

//        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
