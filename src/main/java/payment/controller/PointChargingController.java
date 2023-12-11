package payment.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class PointChargingController {

	@GetMapping("/order")
	public String test() {
		return "/order/test";
	}
}
