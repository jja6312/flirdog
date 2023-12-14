package community.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import community.repository.BoastBoardUserRepository;
import user.bean.User;

@Service
public class BragUserInfoServiceImpl implements BragUserInfoService {
	@Autowired
	private BoastBoardUserRepository boastBoardUserRepository;

	@Override
	public Optional<User> getUser(Long id) {
		// TODO Auto-generated method stub
		return boastBoardUserRepository.findById(id);
	}

}
