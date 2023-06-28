package com.ec.backend.store.product;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@AllArgsConstructor
@CrossOrigin(origins = "*")
//@PreAuthorize("hasRole('ADMIN')")
public class ProductController {

    private ProductService productService;
    @GetMapping("/all")
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @PostMapping
//    @PreAuthorize("hasAuthority('admin:post')")
    public String uploadProduct(@RequestBody Product product){ return productService.uploadProduct(product); }
}
