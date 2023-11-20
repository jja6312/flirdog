package admin.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import admin.service.AdminProductService;
import jakarta.servlet.http.HttpSession;
import product.bean.Product;

@CrossOrigin
@RestController
@RequestMapping(path = "admin")
public class AdminController {
	@Autowired
	private AdminProductService adminProductService;

	// @GetMapping(path = "testGo")
	// public String testGo() {

	// int number = 1;
	// int number2 = 1;
	// int sum = number + number2;

	// String sumString = sum + "";

	// return sumString;
	// }

	@PostMapping(path = "productUpload")
	public void productUpload(@RequestParam("productDTO") String productDTOJson, 
							@RequestParam("mainCategory") String mainCategory,
							@RequestParam("subCategory") String subCategory,
							@RequestParam(value = "imgFiles", required = false) List<MultipartFile> imgFilesList,
							HttpSession session) throws IOException {
		
	    adminProductService.productUpload(productDTOJson, mainCategory, subCategory, imgFilesList, session);

	}
	@GetMapping(path="getProductList", produces = "application/json;charset=UTF-8")
	public List<Product> getProductList(){
		List<Product> productList = adminProductService.getProductList();
		
		return productList;
		
	}
}

