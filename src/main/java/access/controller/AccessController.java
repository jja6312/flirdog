package access.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
import access.bean.KakaoUserInfo;
import access.bean.TranslateRequestDTO;
import access.service.AccessService;
import admin.service.AdminAddressService;
import admin.service.AdminUserService;
import community.bean.BragBoardDTO;
import jakarta.servlet.http.HttpSession;
import matching.bean.MatchingDTO;
import product.bean.Product;
import user.bean.Address;
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
    AdminUserService adminUserService;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private AdminAddressService adminAddressService;

    @PostMapping("translate")
    public ResponseEntity<String> translate(@RequestBody TranslateRequestDTO requestText) {
        String text = requestText.getText();
        String apiUrl = "https://naveropenapi.apigw.ntruss.com/nmt/v1/translation";
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-NCP-APIGW-API-KEY-ID", "yd3optkxe1");
        headers.set("X-NCP-APIGW-API-KEY", "uTnAuUQ0TUj7rhNJ3BgJg3OFigl4MrwPCUJufpJ8");
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
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String passwd, HttpSession session) {
        Optional<User> optionalUser = accessService.login(email, passwd);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Address address = adminAddressService.getAddress(user.getId());

            // 세션에 사용자 정보 저장
            session.setAttribute("user", user);
            session.setAttribute("address", address);

            // 사용자 정보와 주소 정보를 함께 반환
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("address", address);

            return ResponseEntity.ok(response);
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
        @RequestPart(value="dogsInfo", required = false) String dogsInfoJson,
        @RequestPart(value="imageAiProfile", required = false) String imageAiProfile,
        @RequestPart(value="dogsBreed", required = false) String dogsBreedString,
        @RequestPart(value="image", required = false) MultipartFile image,
        HttpSession session
    ) throws Exception {
        System.out.println("###join");

        User user = objectMapper.readValue(userJson, User.class);
        DogsInfo dogsInfo = null;
        Address address = objectMapper.readValue(userJson, Address.class);
        if (dogsInfoJson != null) {
            dogsInfo = objectMapper.readValue(dogsInfoJson, DogsInfo.class);
        }

        DogsBreed dogsBreed = null;
        if (dogsBreedString != null && !dogsBreedString.isEmpty()) {
            dogsBreed = DogsBreed.valueOf(dogsBreedString.toUpperCase());
        }

        JoinRequestDTO joinRequest = new JoinRequestDTO();
        joinRequest.setUser(user);
        joinRequest.setAddress(address);       
        joinRequest.setDogsInfo(dogsInfo);
        joinRequest.setImage(image);
        System.out.println("image: " + image);
        System.out.println("imageAiProfile: " + imageAiProfile);
        joinRequest.setImageAiProfile(imageAiProfile);
        joinRequest.setDogsBreed(dogsBreed);

        accessService.processJoin(joinRequest, session);

        return ResponseEntity.ok().build();
    }

    
    @PostMapping(path = "checkEmailIsExist")
    public ResponseEntity<?> checkEmailIsExist(@RequestParam String email) {
        boolean isExist = accessService.checkEmailExist(email);
        if(isExist) {
            return ResponseEntity.ok(true); // 혹은 복잡한 응답 구조 사용 가능
        } else {
            return ResponseEntity.ok(false);
        }
    }
    @PostMapping(path = "saveDogScore")
    public void saveDogScore(@RequestParam String dogId,
    						@RequestParam String score) {
    	System.out.println("dogsId: "+dogId);
    	System.out.println("score: "+score);
    	accessService.saveDogScore(dogId,score);
    	
    }
    @PostMapping(path = "updatePwd")
    public void updatePwd(@RequestParam String email,
    					@RequestParam String passwd) {

    	accessService.updatePwd(email,passwd);
    	
    }
    
    @PostMapping(path = "getUserInfoAsDogId")
    public Optional<User> getUserInfoAsDogId(@RequestParam String dogId) {
    	System.out.println("###컨트롤러, 개 아이디");
    	System.out.println(dogId);
    	
    	Optional<User> user = accessService.getUserInfoAsDogId(dogId);
    	
    	return user;
    	
    }
    @PostMapping(path = "getMatchingTable")
    public Optional<MatchingDTO> getMatchingTable(@RequestParam String dogName,
    												@RequestParam String userId) {
    	System.out.println("###컨트롤러 getMatchingTable, 개 이름");
    	System.out.println(dogName);
    	System.out.println("###컨트롤러 getMatchingTable, 유저 아이디");
    	System.out.println(userId);
    	
    	
    	Optional<MatchingDTO> matchingDTO = accessService.getMatchingTable(dogName,userId);
    	
    	return matchingDTO;
    	
    }
    @PostMapping(path = "getUserInfoArray")
    public List<User> getUserInfoArray() {
    	
    	
    	List<User> topRankingThreeUserOfAllUser = accessService.getUserInfoArray();
    	
    	return topRankingThreeUserOfAllUser;
    	
    }

   
    
    @PostMapping(path = "getDogsInfoArray")
    public Optional<DogsInfo> getDogsInfoArray(@RequestParam String userId) {
    	
    	
    	Optional<DogsInfo> dogsInfo = accessService.getDogsInfoArray(userId);
    	
    	return dogsInfo;
    	
    }
    
    
    //메인화면, 지역 랭킹 유저3명 가져오기
    @PostMapping(path = "getUserInfoArrayLocation")
    public List<User> getUserInfoArrayLocation(@RequestParam String location) {
    	
    	
    	List<User> topRankingThreeUserOfAllUserLocation = accessService.getUserInfoArrayLocation(location);
    	
    	return topRankingThreeUserOfAllUserLocation;
    	
    }
    //메인화면, 인기상품 8개 가져오기
    @PostMapping(path = "getProductInfoArray")
    public List<Product> getProductInfoArray() {
    	
    	
    	List<Product> productInfoArray = accessService.getProductInfoArray();
    	
    	return productInfoArray;
    	
    }
    //메인화면, 자랑게시판 10개 가져오기
    @PostMapping(path = "getBragBoard")
    public List<BragBoardDTO> getBragBoard() {
    	
    	
    	List<BragBoardDTO> bragBoardInfoArray = accessService.getBragBoard();
    	
    	return bragBoardInfoArray;
    	
    }
    //메인화면, 자랑게시판 최신 10개 가져오기
    @PostMapping(path = "getBragBoardClosestDate10")
    public List<BragBoardDTO> getBragBoardClosestDate10() {
    	
    	
    	List<BragBoardDTO> bragBoardInfoArray = accessService.getBragBoardClosestDate10();
    	
    	return bragBoardInfoArray;
    	
    }
    
    //관리자페이지, 자랑게시판 다가져오기
    @PostMapping(path = "getBoardList")
    public List<BragBoardDTO> getBoardList() {
    	
    	
    	List<BragBoardDTO> boardList = accessService.getBoardList();
    	
    	return boardList;
    	
    }
    
 // 관리자페이지, 게시글삭제 1개
 	@PostMapping(path = "boardDelete")
 	public void boardDelete(@RequestParam("boardId") String boardId) {

 		accessService.boardDelete(boardId);

 	}

 	 // 관리자페이지, 게시글삭제 여러개
 	@PostMapping(path = "boardDeleteSelected")
 	public void userDeleteSelected(@RequestParam("boardId") String boardId) {

 		accessService.boardDeleteSelected(boardId);

 	}



 	@PostMapping("kakaoAuth")
 	public ResponseEntity<?> handleKakaoToken(@RequestBody Map<String, String> tokenMap, HttpSession session) {
 	    String accessToken = tokenMap.get("token");
 	    KakaoUserInfo kakaoUserInfo = adminUserService.getKakaoUserInfo(accessToken);
 	    User user = adminUserService.processKakaoLogin(kakaoUserInfo);
 	    Address address = adminAddressService.getAddress(user.getId());

 	    // 세션에 사용자 정보 저장
 	    session.setAttribute("user", user);
 	    session.setAttribute("address", address);

 	    // 사용자 정보와 주소 정보를 함께 반환
 	    Map<String, Object> response = new HashMap<>();
 	    response.put("user", user);
 	    response.put("address", address);

 	    return ResponseEntity.ok(response);
 	}
 	 
 	 
 	 //미모 점수 높은 순(베스트플러독) 개 리스트
     @PostMapping(path = "getDogsInfoArrayByBeautyScore")
     public List<DogsInfo> getDogsInfoArrayByBeautyScore() {
     	
     	
     	List<DogsInfo> topRankingThreeDogOfAllDogsInfo = accessService.getDogsInfoArrayByBeautyScore();
     	
     	return topRankingThreeDogOfAllDogsInfo;
     	
     }
 	 //미모 점수 높은 순(베스트플러독) 개리스트에따른 유저
     @PostMapping(path = "getUserInfoArrayOfThreeDogsInfo")
     public Optional<User> getUserInfoArrayOfThreeDogsInfo(@RequestParam String userId) {
     	
     	
     	Optional<User> userInfo = accessService.getUserInfoArrayOfThreeDogsInfo(userId);
     	
     	return userInfo;
     	
     }
     
     //---
     
     @GetMapping("getDogsInfoByLocationAndBeautyScore")
     public ResponseEntity<List<DogsInfo>> getDogsInfoByLocation(@RequestParam String location) {
         List<DogsInfo> dogsInfoList = accessService.getDogsInfoByLocationAndBeautyScore(location);
         return ResponseEntity.ok().body(dogsInfoList);
     }

    
// 	 	@PostMapping("/access/kakaoLogin")
//    public String kakaoLogin(@RequestBody String code) {
// 		
//        String tokenRequestUrl = "https://kauth.kakao.com/oauth/token";
//
//
// 	// 토큰 요청을 위한 파라미터 설정
//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("grant_type", "authorization_code");
//        params.add("client_id", "YOUR_REST_API_KEY"); // 여기에 REST API 키 입력
//        params.add("redirect_uri", "YOUR_REDIRECT_URI"); // 여기에 리디렉션 URI 입력
//        params.add("code", code);
//
//        // RestTemplate을 사용하여 토큰 요청
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> response = restTemplate.postForEntity(tokenRequestUrl, params, String.class);
//
//        // 액세스 토큰 추출
//        String accessToken = extractAccessToken(response.getBody());
//
//        // 사용자 정보 요청
//        String userInfo = getUserInfo(accessToken);
//
//        return userInfo;
// 	}
 	
// 	private String extractAccessToken(String responseBody) {
// 	    JSONObject jsonObject = new JSONObject(responseBody);
// 	    return jsonObject.getString("access_token");
// 	}
// 	private String getUserInfo(String accessToken) {
// 	    String requestUrl = "https://kapi.kakao.com/v2/user/me";
//
// 	    HttpHeaders headers = new HttpHeaders();
// 	    headers.setBearerAuth(accessToken);
// 	    HttpEntity<?> entity = new HttpEntity<>(headers);
//
// 	    RestTemplate restTemplate = new RestTemplate();
// 	    ResponseEntity<String> response = restTemplate.exchange(requestUrl, HttpMethod.GET, entity, String.class);
//
// 	    return response.getBody();
// 	}
// 	@PostMapping("/access/kakaoLogin")
//    public String login(@RequestBody KakaoUserInfo kakaoUserInfo, HttpSession session) {
//
//        session.setAttribute("USER", kakaoUserInfo);
//        return "로그인성공";
//    }
    

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
 	  
 	  
 	  
 	  
}