package admin.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import admin.repository.AdminProductRepository;
import jakarta.servlet.http.HttpSession;
import product.bean.MainCategory;
import product.bean.Product;
import product.bean.SubCategory;

@Service
public class AdminProductServiceImpl implements AdminProductService {

	@Autowired
	private ObjectStorageService objectStorageService;
	private String bucketName = "bitcamp-edu-bucket-112";
	@Autowired
	private AdminProductRepository adminProductRepository;

	@Override
	public void productUpload(String productDTOJson, String mainCategory, String subCategory,
			List<MultipartFile> imgFilesList, HttpSession session) throws IOException {

		// 1. 데이터 매핑
		// 1-1.요청받은 dto를 product에 set.
		ObjectMapper objectMapper = new ObjectMapper();
		Product product = objectMapper.readValue(productDTOJson, Product.class);
		System.out.println("제이슨변환: " + product);
		System.out.println("제이슨변환.getName: " + product);

		// 1-2.카테고리들을 enum과 매핑해서 value를 꺼내온다.
		MainCategory mainCategoryEnumClass = MainCategory.valueOf(mainCategory);
		SubCategory subCategoryEnumClass = SubCategory.valueOf(subCategory);

		// 1-3. 이미지 경로
		// 실제 폴더
		// s3문제
		String filePath = session.getServletContext().getRealPath("/public/storage");
		// String filePath =
		// session.getServletContext().getRealPath("/public/image/product/");
		System.out.println("실제폴더 = " + filePath);

		File file;
		String originalFileName;
		String fileName;

		List<String> imagePaths = new ArrayList<>();

		// 이미지가 없는 경우 지정된 이미지사용
		if (imgFilesList.isEmpty() || imgFilesList.get(0).isEmpty()) {
			imagePaths.add("/image/nullImage/nullImage1.png"); // 대체 이미지 경로 또는 빈 문자열
		} else {
			for (MultipartFile img : imgFilesList) {
				originalFileName = img.getOriginalFilename();
				System.out.println("originalFileName: " + originalFileName);
				// s3문제
				fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/product/", img);
				// fileName = UUID.randomUUID().toString() + ".png";

				// s3문제
				file = new File(filePath, originalFileName);
				// file = new File(filePath, fileName);

				// s3문제
				imagePaths.add("flirdogStorage/product/" + fileName);
				// imagePaths.add("/image/product/" + fileName);

				try {
					img.transferTo(file);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		}

		// 2. 빌더 생성
		// builder를 통해 껍데기 product객체를 만든다.
		Product productBuilder = Product.builder()
				.name(product.getName())
				.content(product.getContent())
				.mainCategory(mainCategoryEnumClass)
				.subCategory(subCategoryEnumClass)
				.image(String.join(",", imagePaths))
				.stock(product.getStock())
				.price(product.getPrice())
				// .contentDetail(product.getContentDetail())
				.build();

		System.out.println("productBuilder.getName(): " + productBuilder.getName());
		System.out.println("productBuilder.getImage(): " + productBuilder.getImage());

		adminProductRepository.save(productBuilder);

		// @Override
		// public Integer calculate(Integer a, Integer b) {
		// int sum = a + b;
		// return sum;
		// }

	}

	@Override
	public List<Product> getProductList() {

		return adminProductRepository.findAll();
	}

	@Override
	public void productDelete(String productId) {
		adminProductRepository.deleteById(Long.parseLong(productId));

	}

	@Override
	public void productDeleteSelected(String productId) {
		// productId는 쉼표가 포함되어있을 수도 있다. 따라서 쉼표로 split해서 배열로 만들어준다.
		String[] productIdArray = productId.split(",");

		for (String id : productIdArray) {
			adminProductRepository.deleteById(Long.parseLong(id));
		}

	}

	@Override
	public Optional<Product> getProductList(String productIdString) {
		Long productId = Long.parseLong(productIdString);

		return adminProductRepository.findById(productId);
	}

	@Override
	public void productUpdateWithoutImage(String productDTOJson, String mainCategory, String subCategory,
			String productIdStr) throws JsonMappingException, JsonProcessingException {

		// 1. 데이터 매핑
		ObjectMapper objectMapper = new ObjectMapper();

		Product newProductData = objectMapper.readValue(productDTOJson, Product.class);
		MainCategory mainCategoryEnumClass = MainCategory.valueOf(mainCategory);
		SubCategory subCategoryEnumClass = SubCategory.valueOf(subCategory);

		Long productId = Long.parseLong(productIdStr);
		System.out.println("제이슨변환: " + newProductData);
		System.out.println("메인카테고리: " + mainCategoryEnumClass);
		System.out.println("서브카테고리: " + subCategoryEnumClass);
		Optional<Product> existingProductOpt = adminProductRepository.findById(productId);

		System.out.println("아이디로 찾기 완료");

		// 2. 엔티티 업데이트
		if (existingProductOpt.isPresent()) {
			Product existingProduct = existingProductOpt.get();

			// 기존 객체의 필드를 직접 업데이트
			existingProduct.setName(newProductData.getName());
			existingProduct.setContent(newProductData.getContent());
			existingProduct.setMainCategory(mainCategoryEnumClass);
			existingProduct.setSubCategory(subCategoryEnumClass);
			existingProduct.setStock(newProductData.getStock());
			existingProduct.setPrice(newProductData.getPrice());
			// 이미지 업데이트가 필요한 경우 추가 구현

			adminProductRepository.save(existingProduct);
		} else {
			// productId에 해당하는 제품이 없는 경우 처리
			// 예: 예외 던지기 또는 로깅
		}
	}

	@Override
	public void productUpdateAllWithImage(String productDTOJson, String mainCategory, String subCategory,
			String productIdStr, List<MultipartFile> imgFilesList, HttpSession session)
			throws JsonMappingException, JsonProcessingException {
		// 1. 데이터 매핑
		ObjectMapper objectMapper = new ObjectMapper();

		// 1-2.카테고리들을 enum과 매핑해서 value를 꺼내온다.
		Product newProductData = objectMapper.readValue(productDTOJson, Product.class);
		MainCategory mainCategoryEnumClass = MainCategory.valueOf(mainCategory);
		SubCategory subCategoryEnumClass = SubCategory.valueOf(subCategory);

		Long productId = Long.parseLong(productIdStr);
		System.out.println("제이슨변환: " + newProductData);
		System.out.println("메인카테고리: " + mainCategoryEnumClass);
		System.out.println("서브카테고리: " + subCategoryEnumClass);
		Optional<Product> existingProductOpt = adminProductRepository.findById(productId);

		System.out.println("아이디로 찾기 완료");

		// 1-3. 이미지 경로
		// 실제 폴더
		// s3문제
		String filePath = session.getServletContext().getRealPath("/public/storage");
		// String filePath =
		// session.getServletContext().getRealPath("/public/image/product");
		System.out.println("실제폴더 = " + filePath);

		File file;
		String originalFileName;
		String fileName;

		List<String> imagePaths = new ArrayList<>();

		// 이미지가 없는 경우 지정된 이미지사용
		if (imgFilesList.isEmpty() || imgFilesList.get(0).isEmpty()) {
			imagePaths.add("/image/nullImage/nullImage1.png"); // 대체 이미지 경로 또는 빈 문자열
		} else {
			for (MultipartFile img : imgFilesList) {
				originalFileName = img.getOriginalFilename();
				System.out.println("originalFileName: " + originalFileName);

				fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/", img);
				file = new File(filePath, originalFileName);

				imagePaths.add("flirdogStorage/" + fileName);

				try {
					img.transferTo(file);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		}

		// 2. 엔티티 업데이트
		if (existingProductOpt.isPresent()) {
			Product existingProduct = existingProductOpt.get();

			// 기존 객체의 필드를 직접 업데이트
			existingProduct.setName(newProductData.getName());
			existingProduct.setContent(newProductData.getContent());
			existingProduct.setMainCategory(mainCategoryEnumClass);
			existingProduct.setSubCategory(subCategoryEnumClass);
			existingProduct.setStock(newProductData.getStock());
			existingProduct.setPrice(newProductData.getPrice());
			existingProduct.setImage(String.join(",", imagePaths));
			// 이미지 업데이트가 필요한 경우 추가 구현

			adminProductRepository.save(existingProduct);
		} else {
			// productId에 해당하는 제품이 없는 경우 처리
			// 예: 예외 던지기 또는 로깅
		}

	}

}
