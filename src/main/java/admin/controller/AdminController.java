package admin.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import admin.service.AdminUploadService;
import jakarta.servlet.http.HttpSession;
import product.bean.MainCategory;
import product.bean.Product;
import product.bean.SubCategory;

@CrossOrigin
@RestController
@RequestMapping(path = "admin")
public class AdminController {
	// @Autowired
	// private AdminUploadService adminUploadService;
	// @Autowired
	// private ObjectStorageService objectStorageService;
	// private String bucketName = "bitcamp-edu-bucket-111";
	@Autowired
	private AdminUploadService adminUploadService;

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
							@RequestPart("imgFiles") List<MultipartFile> imgFilesList,
							HttpSession session) throws IOException {
		
	    adminUploadService.productUpload(productDTOJson, mainCategory, subCategory, imgFilesList, session);

	}
}

