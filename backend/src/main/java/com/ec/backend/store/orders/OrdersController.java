package com.ec.backend.store.orders;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
@AllArgsConstructor
public class OrdersController {

    private OrdersService ordersService;

    @GetMapping
    public List<Orders> getAllOrderedProducts(){ return ordersService.getAllOrderedProducts();}

    @PostMapping
    public void addProductsFromCart(@RequestBody Orders orders){
        ordersService.addProductsFromCart(orders);
    }
}
