package ai.service;

import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import admin.service.ObjectStorageService;

@Service
@PropertySource("classpath:ai.properties")
public class ChatGPTService {
    @Autowired
    private ObjectStorageService objectStorageService;
    private String bucketName = "bitcamp-edu-bucket-112";

    @Value("${dalle.api.key}")
    private String apiKeyDalle;

    public String downloadAndSaveImage(String imageUrl, String fileName) throws Exception {
        URL url = new URL(imageUrl); // imageUrl을 기반으로 URL 객체 생성
        Resource resource = new UrlResource(url); // url을 이용하여 UrlResource 객체를 생성한다.

        // S3 버킷에 업로드할 파일의 경로
        String s3FilePath = "flirdogStorage/aiDogProfile/";

        // 이미지의 InputStream을 얻는다.
        try (InputStream inputStream = resource.getInputStream()) {
            // S3 버킷에 이미지 업로드
            String s3FileName = objectStorageService.uploadFile(bucketName, s3FilePath, inputStream, "image/jpeg");
            // 콘솔에 업로드된 파일 경로 출력 (디버깅용)
            System.out.println("Uploaded to S3: " + s3FilePath);
            return s3FileName;
        }
        

        
        
    }

    // Dalle3
    public String generateImage(String prompt) throws Exception {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKeyDalle);

        // 요청 본문 생성
        JSONObject requestBody = new JSONObject();
        requestBody.put("prompt", prompt);

        HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);

        // OpenAI 이미지 생성 API 호출
        String apiUrl = "https://api.openai.com/v1/images/generations";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);

        // 응답에서 이미지 URL 추출 및 반환
        JSONObject responseBody = new JSONObject(response.getBody());
        return responseBody.getJSONArray("data").getJSONObject(0).getString("url");
        
    }
}

// private RestTemplate restTemplate = new RestTemplate();
// // @Value("${openai.key}")
// private String apiKey =
// "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";

// public void OpenAiService(RestTemplateBuilder restTemplateBuilder) {
// this.restTemplate = restTemplateBuilder.build();
// }

// public String fetchImageUrl(String prompt) {
// HttpHeaders headers = new HttpHeaders();
// headers.set("Authorization", "Bearer " + apiKey);
// headers.setContentType(MediaType.APPLICATION_JSON);

// HttpEntity<Map<String, Object>> request = new HttpEntity<>(Map.of("prompt",
// prompt), headers);
// ResponseEntity<Map> response =
// restTemplate.postForEntity("https://api.openai.com/v1/images/generations",
// request, Map.class);

// // OpenAI 응답에서 이미지 URL 추출 (응답 구조에 따라 조정 필요)
// String imageUrl = (String) response.getBody().get("url");
// return imageUrl;
// }