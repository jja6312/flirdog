package admin.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import product.bean.Product;

public interface AdminProductService {
	public void productUpload(String productDTOJson, String mainCategory, String subCategory,
			List<MultipartFile> imgFilesList, HttpSession session) throws IOException;

	public List<Product> getProductList();

	// Integer calculate(Integer a, Integer b);

}
