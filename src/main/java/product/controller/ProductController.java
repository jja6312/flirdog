package product.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ProductController {

	@GetMapping(path="/product", produces = "application/json;charset=UTF-8")
	public String test() {
		return "/product/test";
	}
}
