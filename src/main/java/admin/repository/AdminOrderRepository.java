package admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import order.bean.Orders;

public interface AdminOrderRepository extends JpaRepository<Orders, Long>{

}
