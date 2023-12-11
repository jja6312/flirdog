package admin.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;

public interface AdminUploadService {

	void productUpload(String productDTOJson, String mainCategory, String subCategory,
			List<MultipartFile> imgFilesList, HttpSession session) throws IOException;

	String productUpload(MultipartFile imgFile) throws IOException;

//	void productUpload();

	// Integer calculate(Integer a, Integer b);

}
