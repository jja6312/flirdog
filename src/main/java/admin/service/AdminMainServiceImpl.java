package admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import admin.repository.AdminAddressRepository;
import user.bean.Address;

@Service
@Transactional
public class AdminMainServiceImpl implements AdminMainService {
	@Autowired
	private AdminAddressRepository adminAddressRepository; 
	
	
	


	@Override
	public List<Address> getAddress() {

		return adminAddressRepository.findAll();
	}

}
