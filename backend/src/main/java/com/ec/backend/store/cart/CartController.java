package com.ec.backend.store.cart;

import com.ec.backend.store.product.Product;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@AllArgsConstructor
@CrossOrigin("*")
public class CartController {

    private CartService cartService;

    @GetMapping
    public List<Cart> getAllCartProducts(){ return cartService.getAllCartProducts(); }

    @PostMapping
    public String addProductToCart(@RequestBody Cart cart){
        return cartService.addProductToCart(cart);
    }

    @DeleteMapping
    public void emptyCart(){
        cartService.emptyCart();
    }
}
