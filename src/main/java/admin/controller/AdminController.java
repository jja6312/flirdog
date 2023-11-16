package admin.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import admin.service.AdminUploadService;
import jakarta.servlet.http.HttpSession;
import product.bean.Product;

@CrossOrigin
@RestController
@RequestMapping(path = "admin")
public class AdminController {
	// @Autowired
	// private AdminUploadService adminUploadService;
	// @Autowired
	// private ObjectStorageService objectStorageService;
	// private String bucketName = "bitcamp-edu-bucket-111";

	@PostMapping(path = "upload")
	public void upload(@RequestPart("Product") Product product,
			@RequestPart("img") List<MultipartFile> list,
			HttpSession session) {

		System.out.println("product=" + product);
		System.out.println("list=" + list);
		// 실제 폴더
		String filePath = session.getServletContext().getRealPath("/public/storage");
		System.out.println("실제폴더 = " + filePath);

		// File file;
		// String originalFileName;
		// String fileName;

		// List<Product> userImageList = new ArrayList<>();
		// -------------------
		// for(MultipartFile img : list) {
		// originalFileName = img.getOriginalFilename();
		// System.out.println(originalFileName);
		//
		// fileName = objectStorageService.uploadFile(bucketName, "storage/", img);
		// file = new File(filePath, originalFileName);
		//
		// try {
		// img.transferTo(file);
		// } catch (IOException e) {
		// e.printStackTrace();
		// }
		////
		// Product dto = new Product();
		// dto.setName(product.getName());//상품명
		// dto.setContent(product.getContent());//상품내용
		// dto.setImageFileName(fileName); //UUID
		// dto.setImageOriginalName(originalFileName);
		//
		// userImageList.add(dto);
		//
		// }
		// System.out.println("userImageList는?");
		// System.out.println(userImageList);
		// for(int i=0; i<userImageList.size(); i++) {
		// System.out.println("getImageName"+userImageList.get(i).getImageName());
		// System.out.println("getImageContent"+userImageList.get(i).getImageContent());
		// System.out.println("getImageFileName"+userImageList.get(i).getImageFileName());
		// System.out.println("getImageOriginalName"+userImageList.get(i).getImageOriginalName());
		//
		// }
		// userUploadService.upload(userImageList);
	}
}
