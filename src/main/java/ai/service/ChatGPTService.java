package ai.service;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatGPTService {
	
	  private RestTemplate restTemplate = new RestTemplate();
	  	@Value("${openai.key}")
	    private String apiKey;

	    public void OpenAiService(RestTemplateBuilder restTemplateBuilder) {
	        this.restTemplate = restTemplateBuilder.build();
	    }

	    public String fetchImageUrl(String prompt) {
	        HttpHeaders headers = new HttpHeaders();
	        headers.set("Authorization", "Bearer " + apiKey);
	        headers.setContentType(MediaType.APPLICATION_JSON);

	        HttpEntity<Map<String, Object>> request = new HttpEntity<>(Map.of("prompt", prompt), headers);
	        ResponseEntity<Map> response = restTemplate.postForEntity("https://api.openai.com/v1/images/generations", request, Map.class);

	        // OpenAI 응답에서 이미지 URL 추출 (응답 구조에 따라 조정 필요)
	        String imageUrl = (String) response.getBody().get("url");
	        return imageUrl;
	    }

	    public void downloadAndSaveImage(String imageUrl, String fileName) throws Exception {
	        URL url = new URL(imageUrl);
	        Resource resource = new UrlResource(url);

	        Path path = Paths.get("path/to/save/" + fileName); // 이미지를 저장할 경로
	        try (InputStream inputStream = resource.getInputStream()) {
	            Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
	        }
	    }

}
