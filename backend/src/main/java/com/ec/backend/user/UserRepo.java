package com.ec.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {
    public User findByEmail(String email);
//    Optional<User> findByEmail(String email);
}
