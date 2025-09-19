package com.ec.backend.store.cart;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class CartService {
    private CartRepo cartRepo;

    public List<Cart> getCartByEmail(String email) {
        return cartRepo.findByEmail(email);
    }

    public String addProductsToCart(List<Cart> cartItems) {
        if (cartItems == null || cartItems.isEmpty()) {
            return "No items to add to cart";
        }
        
        if (!cartItems.isEmpty()) {
            String email = cartItems.get(0).getEmail();
            cartRepo.deleteByEmail(email);
        }
        
        cartRepo.saveAll(cartItems);
        return "Products added to Cart successfully";
    }

    public void emptyCartByEmail(String email) {
        cartRepo.deleteByEmail(email);
    }
    
    public void emptyCart() {
        cartRepo.deleteAll();
    }
}