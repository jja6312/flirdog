package somoim.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import somoim.bean.Somoim;
import somoim.repository.SomoimRepository;

@Service
public class SomoimServiceImpl implements SomoimService {
	
	@Autowired
	private SomoimRepository somoimRepository;

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
}
