package admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.repository.AdminMatchingRepository;
import matching.bean.MatchingDTO;

@Service
public class AdminMatchingServiceImpl implements AdminMatchingService {
	@Autowired
	private AdminMatchingRepository adminMatchingRepository;

	@Override
	public List<MatchingDTO> getMatchingList() {
		
		return adminMatchingRepository.findAll();
	}

	@Override
	public void matchingDelete(String matchingId) {
		adminMatchingRepository.deleteById(Long.parseLong(matchingId));
		
	}

	@Override
	public void matchingDeleteSelected(String matchingId) {
		String[] matchingIdArray = matchingId.split(",");

		for (String id : matchingIdArray) {
			adminMatchingRepository.deleteById(Long.parseLong(id));
		}
		
	}
}
