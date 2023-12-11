package admin.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import admin.repository.AdminProductRepository;
import jakarta.servlet.http.HttpSession;
import product.bean.MainCategory;
import product.bean.Product;
import product.bean.SubCategory;

@Service
@Transactional
public class AdminUploadServiceImpl implements AdminUploadService {
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

		// 1-2.카테고리들을 enum과 매핑해서 value를 꺼내온다.
		MainCategory mainCategoryEnumClass = MainCategory.valueOf(mainCategory);
		SubCategory subCategoryEnumClass = SubCategory.valueOf(subCategory);

		// 1-3. 이미지 경로
		// 실제 폴더
		String filePath = session.getServletContext().getRealPath("/public/storage");
		System.out.println("실제폴더 = " + filePath);

		File file;
		String originalFileName;
		String fileName;

		List<String> imagePaths = new ArrayList<>();
		for (MultipartFile img : imgFilesList) {
			originalFileName = img.getOriginalFilename();
			System.out.println("originalFileName: " + originalFileName);
			imagePaths.add("/storage/" + originalFileName);

			fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/", img);
			file = new File(filePath, originalFileName);

			try {
				img.transferTo(file);
			} catch (IOException e) {
				e.printStackTrace();
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

	}

	//종인님께7.start--------------------------------------------
	@Override
	public String productUpload(MultipartFile imgFile) throws IOException {

		String fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/message/", imgFile);

		return fileName;

	}
	//종인님께8.end--------------------------------------------

	// @Override
	// public Integer calculate(Integer a, Integer b) {
	// int sum = a + b;
	// return sum;
	// }

}
