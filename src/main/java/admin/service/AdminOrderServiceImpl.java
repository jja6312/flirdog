package admin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.repository.AdminOrderRepository;
import order.bean.OrderStatus;
import order.bean.Orders;

@Service
public class AdminOrderServiceImpl implements AdminOrderService {
	@Autowired
	private AdminOrderRepository adminOrderRepository;
	
	
	@Override
	public List<Orders> getOrderList() {
	    return adminOrderRepository.findByOrderStatus(OrderStatus.PAYMENT_COMPLETED);
	}



	@Override
	public void orderCheck(String id) {

	    Optional<Orders> orderOptional = adminOrderRepository.findById(Long.parseLong(id));


	    orderOptional.ifPresent(order -> {
	        order.setOrderStatus(OrderStatus.ORDER_CHECKED);
	        adminOrderRepository.save(order); // 변경된 주문 상태를 저장
	    });
	}

	@Override
	public void orderCancle(String id) {

	    Optional<Orders> orderOptional = adminOrderRepository.findById(Long.parseLong(id));

	    // 주문이 존재하면 상태를 변경
	    orderOptional.ifPresent(order -> {
	        order.setOrderStatus(OrderStatus.ORDER_CANCLED);
	        adminOrderRepository.save(order); // 변경된 주문 상태를 저장
	    });
	}



	@Override
	public void orderCompleted(String id) {
		Optional<Orders> orderOptional = adminOrderRepository.findById(Long.parseLong(id));

	    // 주문이 존재하면 상태를 변경
	    orderOptional.ifPresent(order -> {
	        order.setOrderStatus(OrderStatus.COMPLETED);
	        adminOrderRepository.save(order); // 변경된 주문 상태를 저장
	    });
		
	}
	
	@Override
	public List<Orders> getOrderCheckList() {
	    return adminOrderRepository.findByOrderStatus(OrderStatus.ORDER_CHECKED);
	}
	
	@Override
	public List<Orders> getOrderCompleted() {
	    return adminOrderRepository.findByOrderStatus(OrderStatus.COMPLETED);
	}
}
