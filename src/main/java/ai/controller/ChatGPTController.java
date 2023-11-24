package ai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ai.service.ChatGPTService;

@RestController
@CrossOrigin
@RequestMapping("chatGPT")
public class ChatGPTController {

    @Autowired
    private ChatGPTService chatGPTService;

    @PostMapping("saveImgUrlToFile")
    public String image(@RequestParam String prompt) {
        try {
            String imageUrl = chatGPTService.fetchImageUrl(prompt);
            if (imageUrl != null && !imageUrl.isEmpty()) {
                // 이미지 파일 이름을 생성합니다.
                String fileName = prompt.replaceAll("\\s", "_") + ".jpg";
                chatGPTService.downloadAndSaveImage(imageUrl, fileName);
                return "Image saved successfully: " + fileName;
            } else {
                return "Image URL not found.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred: " + e.getMessage();
        }
    }
}
