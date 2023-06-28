package com.ec.backend.store.orders;

import com.ec.backend.store.product.ProductRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OrdersService {

    private OrdersRepo ordersRepo;
    private ProductRepo productRepo;

    public List<Orders> getAllOrderedProducts() {
        return ordersRepo.findAll();
    }

    public void addProductsFromCart(Orders orders) {
        if(productRepo.existsById(orders.getId())){
            ordersRepo.save(orders);
        }
        else return;
    }
}
