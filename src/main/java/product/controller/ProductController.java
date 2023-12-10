package product.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import product.bean.Product;
import product.bean.SubCategory;
import product.service.ProductSearchService;

@RestController
@CrossOrigin
@RequestMapping(path = "product")
public class ProductController {
	@Autowired
	private ProductSearchService productSearchService;

	@GetMapping(path="getAllProducts")
	public List<Product> getAllProducts() {
		return productSearchService.getAllProducts();
	}

	@GetMapping("/searchBySubCategories")
	public List<Product> searchBySubCategories(@RequestParam List<SubCategory> subCategories) {
		return productSearchService.getProductsBySubCategories(subCategories);
	}

	@GetMapping("/getProduct")
	public Product getProduct(@RequestParam String id) {
		return productSearchService.getProductById(id).get();
	}
}
