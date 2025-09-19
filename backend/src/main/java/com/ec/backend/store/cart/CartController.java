package com.ec.backend.store.cart;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cart")
@AllArgsConstructor
@CrossOrigin("*")
public class CartController {
    private CartService cartService;

    @GetMapping
    public ResponseEntity<List<Cart>> getCartByEmail(@RequestParam String email) {
        List<Cart> cartItems = cartService.getCartByEmail(email);
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping
    public ResponseEntity<String> addProductsToCart(@RequestBody List<Cart> cartItems) {
        try {
            String result = cartService.addProductsToCart(cartItems);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving cart: " + e.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<String> emptyCart(@RequestParam String email) {
        try {
            cartService.emptyCartByEmail(email);
            return ResponseEntity.ok("Cart emptied successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error emptying cart: " + e.getMessage());
        }
    }
}
