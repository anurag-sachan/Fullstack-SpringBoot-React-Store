package com.ec.backend.store.cart;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {
    List<Cart> findByEmail(String email);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Cart c WHERE c.email = :email")
    void deleteByEmail(@Param("email") String email);
}