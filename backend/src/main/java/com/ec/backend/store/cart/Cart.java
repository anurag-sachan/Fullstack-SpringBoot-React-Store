package com.ec.backend.store.cart;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Cart {
    @Id
    private int id;
    private String img;
    private String name;
    private String brand;
    private double price;
}
