package admin.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import jakarta.servlet.http.HttpSession;
import product.bean.Product;

public interface AdminProductService {
	public void productUpload(String productDTOJson, String mainCategory, String subCategory,
			List<MultipartFile> imgFilesList, HttpSession session) throws IOException;

	public List<Product> getProductList();

	void productDelete(String productId);

	void productDeleteSelected(String productId);

	Optional<Product> getProductList(String productId);

	void productUpdateWithoutImage(String productDTOJson, String mainCategory, String subCategory, String productId)
			throws JsonMappingException, JsonProcessingException;

	void productUpdateAllWithImage(String productDTOJson, String mainCategory, String subCategory, String productId,
			List<MultipartFile> imgFilesList, HttpSession session)
			throws JsonMappingException, JsonProcessingException;

	// Integer calculate(Integer a, Integer b);

}
