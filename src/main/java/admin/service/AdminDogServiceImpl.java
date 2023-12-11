package admin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.repository.AdminDogRepository;
import user.bean.DogsInfo;
import user.bean.User;

@Service
public class AdminDogServiceImpl implements AdminDogService {
	@Autowired
	private AdminDogRepository adminDogRepository;

	public List<DogsInfo> getAllDogsWithUsers() {
        return adminDogRepository.findAllWithUser();
    }

	@Override
	public void dogDeleteSelected(String dogId) {
	
		String[] dogIdArray = dogId.split(",");

		for (String id : dogIdArray) {
			adminDogRepository.deleteById(Long.parseLong(id));
		}
		
	}

	@Override
	public void dogDelete(String dogId) {
		adminDogRepository.deleteById(Long.parseLong(dogId));
		
	}

	@Override
	public Optional<DogsInfo> getDog(String dogIdStr) {
		Long dogId = Long.parseLong(dogIdStr);
		return adminDogRepository.findById(dogId);
	}
	
	@Override
	public void dogEdit(DogsInfo dogDTO) {
		
		adminDogRepository.save(dogDTO);
		
	}

}
