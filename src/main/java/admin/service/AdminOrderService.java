package admin.service;

import java.util.List;

import order.bean.Orders;
import user.bean.Address;

public interface AdminOrderService {

	List<Orders> getOrderList();

	void orderCheck(String id);

	void orderCancle(String id);

	void orderCompleted(String id);

	List<Orders> getOrderCheckList();

	List<Orders> getOrderCompleted();

	

}
