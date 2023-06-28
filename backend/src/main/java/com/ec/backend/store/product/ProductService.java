package com.ec.backend.store.product;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {

    private ProductRepo productRepo;

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public String uploadProduct(Product product) {
        if(product.getName().isEmpty()) {
            return "Enter product name";
        }
        productRepo.save(product);
        return "new product uploaded";
    }
}
