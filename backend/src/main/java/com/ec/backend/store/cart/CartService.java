package com.ec.backend.store.cart;

import com.ec.backend.store.product.ProductRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CartService {

    private CartRepo cartRepo;
    private ProductRepo productRepo;

    public List<Cart> getAllCartProducts() {
        return cartRepo.findAll();
    }
    public String addProductToCart(Cart cart){
        if(productRepo.existsById(cart.getId())) {
            cartRepo.save(cart);
            return "Product added to Cart";
        }
        return "Product do not exists!";
    }

    public void emptyCart() {
        cartRepo.deleteAll();
    }
}
