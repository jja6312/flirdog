package somoim.service;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

public interface ObjectStorageService {
	
	public String uploadFile(String bucketName, String string, MultipartFile img);

	public void deleteList(String bucketName, String imageFileName);
	
	public String uploadFile(String bucketName, String directoryPath, InputStream inputStream, String contentType)
			throws IOException;
}