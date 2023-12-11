package admin.service;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

public interface ObjectStorageService {

	public String uploadFile(String bucketName, String string, MultipartFile img);

	public void deleteFile(String bucketName, String imageFileName);

	String uploadFile(String bucketName, String directoryPath, InputStream inputStream, String contentType)
			throws IOException;

}
