package admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import order.bean.Order;

public interface AdminOrderRepository extends JpaRepository<Order, Long>{

}
