package access.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import access.bean.JoinRequestDTO;
import access.bean.TranslateRequestDTO;
import access.service.AccessService;
import jakarta.servlet.http.HttpSession;
import user.bean.DogsBreed;
import user.bean.DogsInfo;
import user.bean.User;

@CrossOrigin
@RestController
@RequestMapping(path = "access")
public class AccessController {
    @Autowired
    AccessService accessService;
    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("translate")
    public ResponseEntity<String> translate(@RequestBody TranslateRequestDTO requestText) {
        String text = requestText.getText();
        String apiUrl = "https://naveropenapi.apigw.ntruss.com/nmt/v1/translation";
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-NCP-APIGW-API-KEY-ID", "90e1dkex14");
        headers.set("X-NCP-APIGW-API-KEY", "eKrZeexFTFr41En5qSXUvPFRGXdHOoxPjb7ZjtwZ");
        headers.set("Content-Type", "application/json");

        // 요청 본문 구성
        String requestJson = "{\"source\":\"ko\",\"target\":\"en\",\"text\":\"" + text + "\"}";

        // RestTemplate을 사용하여 외부 API 요청
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> request = new HttpEntity<>(requestJson, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);

        return ResponseEntity.ok(response.getBody());
    }

    @PostMapping(path = "login", produces = "application/json;charset=UTF-8")
    public ResponseEntity<User> login(@RequestParam String email, @RequestParam String passwd) {

        Optional<User> user = accessService.login(email, passwd);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    @PostMapping(path = "getFiveDogsInfo")
    public List<DogsInfo> getFiveDogsInfo() {

        List<DogsInfo> dogsInfo = accessService.getFiveDogsInfo();

        return dogsInfo;

    }

    @PostMapping(path="join")
    public ResponseEntity<?> join(
        @RequestPart("user") String userJson,
        @RequestPart("dogsInfo") String dogsInfoJson,
        @RequestPart("imageAiProfile") String imageAiProfile,
        @RequestPart("dogsBreed") String dogsBreedString,
        @RequestPart(value="image",required = false) MultipartFile image,
        HttpSession session
    ) throws Exception {
    	System.out.println("###join");
//    	  JSON 문자열을 Java 객체로 변환
        User user = objectMapper.readValue(userJson, User.class);
        DogsInfo dogsInfo = objectMapper.readValue(dogsInfoJson, DogsInfo.class);

        DogsBreed dogsBreed = DogsBreed.valueOf(dogsBreedString.toUpperCase()); // 문자열을 Enum으로 변환

        JoinRequestDTO joinRequest = new JoinRequestDTO();
        joinRequest.setUser(user);
        joinRequest.setDogsInfo(dogsInfo);
        joinRequest.setImage(image);
        System.out.println("image: "+image);
        System.out.println("imageAiProfile: "+imageAiProfile);
        joinRequest.setImageAiProfile(imageAiProfile);
        joinRequest.setDogsBreed(dogsBreed);

        accessService.processJoin(joinRequest,session);

        return ResponseEntity.ok().build();
    }
}
// private DefaultMessageService messageService;
//
// public AccessController() {
// this.messageService = NurigoApp.INSTANCE.initialize("NCSCQKHPCVUOSLJB",
// "EENXRX9GDCAN1IDFDIYKUKCVXXCCOLDO", "https://api.coolsms.co.kr");
// }
//
// @PostMapping(path="sendSMS")
// public SingleMessageSentResponse sendMmsByResourcePath(@RequestParam String
// phone) throws IOException {
//
// Message message = new Message();
// // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
// message.setFrom("01023746312");
// message.setTo(phone);
// message.setText("메롱!");
//
// // 여러 건 메시지 발송일 경우 send many 예제와 동일하게 구성하여 발송할 수 있습니다.
// SingleMessageSentResponse response = this.messageService.sendOne(new
// SingleMessageSendingRequest(message));
// System.out.println(response);
//
// return response;
// }