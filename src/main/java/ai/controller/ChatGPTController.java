
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

	// @PostMapping("getToDoListDetail")
	// public String test(@RequestBody String question){
	// return chatService.getChatResponse(question);
	// //\n\nAs an AI language model, I don't have feelings, but I'm functioning
	// well. Thank you for asking. How can I assist you today?
	// }

}
//
//
// package ai.controller;
//
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
//
// import ai.service.AIService;
//
// @RestController
// @CrossOrigin
// @RequestMapping("chatGPT")
// public class ChatGPTController {
// @Autowired
// private AIService aiService;
//
// @PostMapping("image")
// public ResponseEntity<?> generateImage(@RequestBody String prompt) {
// prompt = "귀여운 강아지 그림";
//
// return new ResponseEntity<>(aiService.generatePicture(prompt),
// HttpStatus.OK);
// }
//
// }
