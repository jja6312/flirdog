package admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.repository.AdminOrderRepository;
import order.bean.Order;

@Service
public class AdminOrderServiceImpl implements AdminOrderService {
	@Autowired
	private AdminOrderRepository adminOrderRepository;
	
	
	@Override
	public List<Order> getOrderList() {

		return adminOrderRepository.findAll();
	}

}
