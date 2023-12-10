package product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import product.bean.Product;
import product.bean.SubCategory;
import product.service.ProductSearchService;

import java.util.List;

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

	@GetMapping(path="searchBySubCategories")
	public List<Product> searchBySubCategories(@RequestParam List<SubCategory> subCategories) {
		return productSearchService.getProductsBySubCategories(subCategories);
	}

	@GetMapping(path="getProduct")
	public Product getProduct(@RequestParam Long id) {
		return productSearchService.getProductById(id).get();
	}
}
