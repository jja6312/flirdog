package ai.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ai.bean.ChatAiImageDTO;
import ai.service.ChatService;
import io.github.flashvayne.chatgpt.service.ChatgptService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@Slf4j
@RequestMapping("chatGPT")
public class ChatGPTController {
	 private final ChatService chatService;
    private final ChatgptService chatgptService;
    
    @PostMapping("getAiDogProfileImage")
    public String image(@RequestBody ChatAiImageDTO chatAiImageDTO) {
    	System.out.println("@@chatAiImageDTO:"+chatAiImageDTO);
        String request = chatAiImageDTO.getRequest();
        System.out.println("@@request:"+request);
        
        request="예쁜 강아지 캐릭커쳐";
        System.out.println("@@request:"+request);
        
        return chatService.getImageResponse(request);
    }
    
    @PostMapping("getToDoListDetail")
    public String test(@RequestBody String question){
        return chatService.getChatResponse(question);
        //\n\nAs an AI language model, I don't have feelings, but I'm functioning well. Thank you for asking. How can I assist you today?
    }

}
