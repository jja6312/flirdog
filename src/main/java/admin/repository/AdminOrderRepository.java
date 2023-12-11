package admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import order.bean.OrderStatus;
import order.bean.Orders;

public interface AdminOrderRepository extends JpaRepository<Orders, Long>{
    List<Orders> findByOrderStatus(OrderStatus status);
}
