package admin.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import admin.service.AdminProductService;
import admin.service.AdminUserService;
import jakarta.servlet.http.HttpSession;
import product.bean.Product;
import user.bean.User;

@CrossOrigin
@RestController
@RequestMapping(path = "admin")
public class AdminController {
	@Autowired
	private AdminProductService adminProductService;
	@Autowired
	private AdminUserService adminUserService;

	// @GetMapping(path = "testGo")
	// public String testGo() {

	// int number = 1;
	// int number2 = 1;
	// int sum = number + number2;

	// String sumString = sum + "";

	// return sumString;
	// }

	// 업로드
	@PostMapping(path = "productUpload")
	public void productUpload(@RequestParam("productDTO") String productDTOJson,
			@RequestParam("mainCategory") String mainCategory,
			@RequestParam("subCategory") String subCategory,
			@RequestParam(value = "imgFiles", required = false) List<MultipartFile> imgFilesList,
			HttpSession session) throws IOException {

		adminProductService.productUpload(productDTOJson, mainCategory, subCategory, imgFilesList, session);

	}

	// 상품리스트
	@GetMapping(path = "getProductList", produces = "application/json;charset=UTF-8")
	public List<Product> getProductList() {
		List<Product> productList = adminProductService.getProductList();

		return productList;

	}

	// 상품삭제
	@PostMapping(path = "productDelete")
	public void productDelete(@RequestParam("productId") String productId) {

		adminProductService.productDelete(productId);

	}

	// 상품선택삭제
	@PostMapping(path = "productDeleteSelected")
	public void productDeleteSelected(@RequestParam("productId") String productId) {

		adminProductService.productDeleteSelected(productId);

	}

	// 상품수정폼
	@GetMapping(path = "getProductUpdateForm", produces = "application/json;charset=UTF-8")
	public Optional<Product> getProductList(@RequestParam String productId) {
		Optional<Product> productList = adminProductService.getProductList(productId);

		return productList;

	}

	// 상품수정(이미지를 변경하지 않았을 경우)
	@PostMapping(path = "productUpdateWithoutImage")
	public void productUpdateWithoutImage(@RequestParam("productDTO") String productDTOJson,
			@RequestParam("mainCategory") String mainCategory,
			@RequestParam("subCategory") String subCategory,
			@RequestParam("productId") String productId) throws JsonMappingException, JsonProcessingException {
		System.out.println("여기는 컨트롤러");
		System.out.println("productDTOJson: " + productDTOJson);
		System.out.println("mainCategory: " + mainCategory);
		System.out.println("subCategory: " + subCategory);
		System.out.println("productId: " + productId);

		adminProductService.productUpdateWithoutImage(productDTOJson, mainCategory, subCategory, productId);

	}

	// 상품수정(이미지가 변경되었을 경우)
	@PostMapping(path = "productUpdateAllWithImage")
	public void productUpdateAllWithImage(@RequestParam("productDTO") String productDTOJson,
			@RequestParam("mainCategory") String mainCategory,
			@RequestParam("subCategory") String subCategory,
			@RequestParam("productId") String productId,
			@RequestParam(value = "imgFiles", required = false) List<MultipartFile> imgFilesList,
			HttpSession session) throws JsonMappingException, JsonProcessingException {
		System.out.println("여기는 컨트롤러");
		System.out.println("productDTOJson: " + productDTOJson);
		System.out.println("mainCategory: " + mainCategory);
		System.out.println("subCategory: " + subCategory);
		System.out.println("productId: " + productId);

		adminProductService.productUpdateAllWithImage(productDTOJson, mainCategory, subCategory, productId,
				imgFilesList, session);

	}

	// 회원리스트
	@GetMapping(path = "getUserList", produces = "application/json;charset=UTF-8")
	public List<User> getUserList() {
		List<User> userList = adminUserService.getUserList();

		return userList;

	}
	
	// 회원삭제
	@PostMapping(path = "userDelete")
	public void userDelete(@RequestParam("userId") String userId) {

		adminUserService.userDelete(userId);

	}
	
	// 회원선택삭제
	@PostMapping(path = "userDeleteSelected")
	public void userDeleteSelected(@RequestParam("userId") String userId) {

		adminUserService.userDeleteSelected(userId);

	}
	
	//특정 회원불러오기
	// 회원리스트
	@PostMapping(path = "getUser")
	public Optional<User> getUser(@RequestBody Map<String, String> requestBody) {
	    String userId = requestBody.get("userId");
	    System.out.println("!!!!!!!!!userid:" + userId);
	    Optional<User> user = adminUserService.getUser(userId);

	    return user;
	}
	
	
	// 회원 정보 수정
	@PostMapping(path = "userEdit")
	public void userEdit(@RequestBody User userDTO) throws JsonMappingException, JsonProcessingException {
		System.out.println("userDTO!!!: "+userDTO);

		adminUserService.userEdit(userDTO);

	}

}
