package somoim.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import somoim.bean.Somoim;
import somoim.repository.SomoimRepository;
import somoim.repository.SomoimUserRepository;
import user.bean.User;

@Service
public class SomoimServiceImpl implements SomoimService {
	
	@Autowired
	private SomoimRepository somoimRepository;
	private SomoimUserRepository somoimUserRepository;

	@Override
	public void write(Somoim somoim) {
		System.out.println("서비스" + somoim);
		somoimRepository.save(somoim);
	}

	@Override
	public Optional<Somoim> getSomoimForm(Long id) {
		Optional<Somoim> getSomoim = somoimRepository.findById(id);
		System.out.println(getSomoim);
		return getSomoim;
	}
	
	@Override
	public Optional<User> getUser(String userIdStr) {
		Long userId = Long.parseLong(userIdStr);
		//Integer userId = Integer.parseInt(userIdStr);
		
		System.out.println("여기는 서비스"+userId);
		return somoimUserRepository.findById(userId);
	}

	@Override
	public List<Somoim> getSomoimList() {

		return somoimRepository.findAll();
	}
}
