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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import admin.service.AdminDogService;
import admin.service.AdminMainService;
import admin.service.AdminMatchingService;
import admin.service.AdminOrderService;
import admin.service.AdminProductService;
import admin.service.AdminUploadService;
import admin.service.AdminUserService;
import admin.service.ObjectStorageService;
import jakarta.servlet.http.HttpSession;
import matching.bean.MatchingDTO;
import order.bean.Orders;
import product.bean.Product;
import user.bean.Address;
import user.bean.DogsInfo;
import user.bean.User;

@CrossOrigin
@RestController
@RequestMapping(path = "admin")
public class AdminController {
	@Autowired
	private AdminProductService adminProductService;
	@Autowired
	private AdminUserService adminUserService;
	@Autowired
	private AdminOrderService adminOrderService;
	@Autowired
	private ObjectStorageService objectStorageService;
	@Autowired
	private AdminDogService adminDogService;
	@Autowired
	private AdminMatchingService adminMatchingService;
	@Autowired
	private AdminUploadService adminUploadService;
	@Autowired
	private AdminMainService adminMainService;

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

	// 주문리스트
//	@GetMapping(path = "getOrderList")
//	public List<Orders> getOrderList() {
//		List<Orders> orderList = adminOrderService.getOrderList();
//
//		return orderList;
//
//	}

	// 애견리스트
	@GetMapping(path = "getDogList", produces = "application/json;charset=UTF-8")
	public List<DogsInfo> getDogList() {
		List<DogsInfo> dogList = adminDogService.getAllDogsWithUsers();

		return dogList;

	}
	// 애견선택삭제
	@PostMapping(path = "dogDeleteSelected")
	public void dogDeleteSelected(@RequestParam("dogId") String dogId) {

		adminDogService.dogDeleteSelected(dogId);

	}

	// 애견삭제
	@PostMapping(path = "dogDelete")
	public void dogDelete(@RequestParam("dogId") String dogId) {

		adminDogService.dogDelete(dogId);

	}


	//특정 애견불러오기
	@PostMapping(path = "getDog")
	public Optional<DogsInfo> getDog(@RequestBody Map<String, String> requestBody) {
		String dogId = requestBody.get("dogId");
		Optional<DogsInfo> dog = adminDogService.getDog(dogId);

		return dog;
	}

	// 회원 정보 수정
	@PostMapping(path = "dogEdit")
	public void userEdit(@RequestBody DogsInfo dogDTO) throws JsonMappingException, JsonProcessingException {

		adminDogService.dogEdit(dogDTO);

	}

	// 매칭리스트
	@GetMapping(path = "getMatchingList", produces = "application/json;charset=UTF-8")
	public List<MatchingDTO> getMatchingList() {
		List<MatchingDTO> matchingList = adminMatchingService.getMatchingList();

		return matchingList;

	}

	// 매칭삭제
	@PostMapping(path = "matchingDelete")
	public void matchingDelete(@RequestParam("matchingId") String matchingId) {

		adminMatchingService.matchingDelete(matchingId);

	}

	@PostMapping(path = "matchingDeleteSelected")
	public void matchingDeleteSelected(@RequestParam("matchingId") String matchingId) {
		adminMatchingService.matchingDeleteSelected(matchingId);
	}

	// 주문리스트
	@GetMapping(path = "getOrderList")
	public List<Orders> getOrderList() {
		List<Orders> orderList = adminOrderService.getOrderList();

		return orderList;

	}
	// 주소가져오기
	@GetMapping(path = "getAddress")
	public List<Address> getAddress() {
		List<Address> addressList = adminMainService.getAddress();
		
		return addressList;
		
	}
	// 발주확인
	@GetMapping(path = "orderCheck")
	public void orderCheck(@RequestParam String id) {
		System.out.println("컨트롤러 id: "+id);
		adminOrderService.orderCheck(id);
	}
	// 발주취소
	@GetMapping(path = "orderCancle")
	public void orderCancle(@RequestParam String id) {
		System.out.println("컨트롤러 id: "+id);
		adminOrderService.orderCancle(id);
	}
	// 배송시작
	@GetMapping(path = "orderCompleted")
	public void orderCompleted(@RequestParam String id) {

		adminOrderService.orderCompleted(id);
	}
	
	// 발주리스트
	@GetMapping(path = "getOrderCheckList")
	public List<Orders> getOrderCheckList() {
		List<Orders> orderCheckList = adminOrderService.getOrderCheckList();

		return orderCheckList;

	}
	// 발주리스트
	@GetMapping(path = "getOrderCompleted")
	public List<Orders> getOrderCompleted() {
		List<Orders> orderCompletedList = adminOrderService.getOrderCompleted();
		
		return orderCompletedList;
		
	}
	
	
	//종인님께5.start----------------------------------------- 
	@PostMapping(path = "oneFileGo")
	public String oneFileGo(@RequestPart MultipartFile file) throws IOException {
		return adminUploadService.productUpload(file);
	}
	//종인님께6.end--------------------------------------------
	


}