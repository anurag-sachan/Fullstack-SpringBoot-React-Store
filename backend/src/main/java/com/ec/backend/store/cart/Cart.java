package com.ec.backend.store.cart;

import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "Cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String img;
    private String name;
    private String brand;
    private double price;
    private int quantity;
    
    @Column(name = "email", nullable = false)
    private String email;
}