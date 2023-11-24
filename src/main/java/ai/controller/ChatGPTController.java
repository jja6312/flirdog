package ai.controller;

import java.util.UUID;

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

    @PostMapping("downloadAndSaveImage")
    public String image(@RequestParam String imageUrl) {
        try {
            if (imageUrl != null && !imageUrl.isEmpty()) {
                System.out.println("@@@imageUrl:" + imageUrl);
                // 이미지 파일 이름을 생성합니다.
                String fileName = UUID.randomUUID().toString();
                fileName += ".jpg";
                chatGPTService.downloadAndSaveImage(imageUrl, fileName);
                return "Image saved successfully: " + fileName;
            } else {
                System.out.println("@@@이미지가 널값인디?");
                return "Image URL not found.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e);
            System.out.println("@@@문제발생");
            return "Error occurred: " + e.getMessage();
        }
    }
}
