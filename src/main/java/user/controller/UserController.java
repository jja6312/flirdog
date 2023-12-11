package user.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import user.bean.User;
import user.service.UserService;

@CrossOrigin 
@RestController
public class UserController {
	@Autowired
	private UserService userService;
	
	//로그인
	@PostMapping(path = "login", produces = "application/json;charset=UTF-8")
	public Optional<User> login(@RequestBody User loginUser) {
		String email = loginUser.getEmail();
        String passwd = loginUser.getPasswd();
        
	    System.out.println("!!!!!!!!!loginUser : " + loginUser);
	    
	    Optional<User> userLogin = userService.login(email, passwd);
	    
	    if (userLogin.isPresent()) {
            // 로그인 성공 시
            User user = userLogin.get();
            System.out.println("로그인 성공! 사용자 이름: " + user.getName() + "사용자 아이디 : " + user.getId());
        } else {
            // 로그인 실패 시
        	System.out.println("로그인 실패! 아이디 또는 비밀번호가 일치하지 않습니다.");
        }
	    return userLogin;
	}
}
