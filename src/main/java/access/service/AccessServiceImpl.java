package access.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import access.repository.AccessRepository;
import user.bean.User;

@Service
public class AccessServiceImpl implements AccessService {
	@Autowired
	   public AccessRepository accessRepository;
	   
	   @Override
	    public Optional<User> login(String email, String passwd) {
	        return accessRepository.findByEmailAndPasswd(email, passwd);
	    }

	   @Override
	   public Optional<User> findId(Long id) {
	      Optional<User> user = accessRepository.findById(id);
	      System.out.println("UserService id값 찾기 : " + user);
	      return user;
	   }

}
