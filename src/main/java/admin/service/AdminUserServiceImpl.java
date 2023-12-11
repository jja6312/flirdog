package admin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import access.bean.KakaoUserInfo;
import admin.repository.AdminUserRepository;
import user.bean.User;
import user.bean.UserRole;

@Service
public class AdminUserServiceImpl implements AdminUserService {
	@Autowired
	private AdminUserRepository adminUserRepository;
	
	@Override
	public List<User> getUserList() {

		return adminUserRepository.findAll();
	}

	@Override
	public void userDelete(String userId) {
		adminUserRepository.deleteById(Long.parseLong(userId));
		
	}

	@Override
	public void userDeleteSelected(String userId) {
		// userId는 쉼표가 포함되어있을 수도 있다. 따라서 쉼표로 split해서 배열로 만들어준다.
		String[] userIdArray = userId.split(",");

		for (String id : userIdArray) {
			adminUserRepository.deleteById(Long.parseLong(id));
		}
		
	}

	@Override
	public Optional<User> getUser(String userIdStr) {
		Long userId = Long.parseLong(userIdStr);
		
		System.out.println("여기는 서비스"+userId);
		return adminUserRepository.findById(userId);
	}



	@Override
	public void userEdit(User userDTO) {
		
		adminUserRepository.save(userDTO);
		
	}
	
	public User processKakaoLogin(KakaoUserInfo kakaoUserInfo) {
        String email = kakaoUserInfo.getKakao_account().getEmail();
        Optional<User> existingUser = adminUserRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            return existingUser.get();
        } else {
            User newUser = new User();
            newUser.setEmail(email); 
            newUser.setUserRole(UserRole.USER);
            adminUserRepository.save(newUser);
            return newUser;
        }
    }


	@Override
	public KakaoUserInfo getKakaoUserInfo(String accessToken) {
	    RestTemplate restTemplate = new RestTemplate();
	    String kakaoUserInfoUrl = "https://kapi.kakao.com/v2/user/me";

	    HttpHeaders headers = new HttpHeaders();
	    headers.setBearerAuth(accessToken);
	    HttpEntity<?> entity = new HttpEntity<>(headers);

	    ResponseEntity<String> response = restTemplate.exchange(
	        kakaoUserInfoUrl, HttpMethod.GET, entity, String.class
	    );

	    // JSON 응답을 KakaoUserInfo 객체로 파싱
	    // 이 과정에서 Jackson 라이브러리 등을 사용하여 JSON 문자열을 객체로 변환할 수 있습니다.
	    return parseKakaoUserInfo(response.getBody());
	}
	
	private KakaoUserInfo parseKakaoUserInfo(String responseBody) {
	    ObjectMapper objectMapper = new ObjectMapper();
	    try {
	        return objectMapper.readValue(responseBody, KakaoUserInfo.class);
	    } catch (JsonProcessingException e) {
	        e.printStackTrace();
	        return null; // 또는 적절한 예외 처리
	    }
	}

	

}
