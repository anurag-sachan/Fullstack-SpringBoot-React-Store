package com.ec.backend.store.orders;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Orders {
    @Id
    private int id;
    private String img;
    private String name;
    private String brand;
    private double price;
}
