package access.controller;

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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import access.bean.TranslateRequestDTO;
import access.service.AccessService;
import user.bean.User;

@CrossOrigin
@RestController
@RequestMapping(path = "access")
public class AccessController {
    @Autowired
    AccessService accessService;

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