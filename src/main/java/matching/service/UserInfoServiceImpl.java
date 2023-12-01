package matching.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import matching.repository.MatchingUserRepository;
import user.bean.User;

@Service
public class UserInfoServiceImpl implements UserInfoService{
	@Autowired
	private MatchingUserRepository matchingUserRepository;
	
	
	@Override
	public Optional<User> getUser(Long id) {
		
		return matchingUserRepository.findById(id);
	}
	

}
