package admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.repository.AdminAddressRepository;
import user.bean.Address;

@Service
public class AdminAddressServiceImpl implements AdminAddressService {
	@Autowired
	private AdminAddressRepository adminAddressRepository;

	@Override
	public Address getAddress(Long id) {
		
		return adminAddressRepository.findByUserId(id);
	}

}
