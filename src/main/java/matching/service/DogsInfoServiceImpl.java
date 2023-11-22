package matching.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import matching.repository.MatchingRepository;
import user.bean.DogsInfo;
import user.bean.User;

@Service
public class DogsInfoServiceImpl implements DogsInfoService {
	@Autowired
	private MatchingRepository matchingRepository;

	@Override
	public List<DogsInfo> getDogsInfoListByUserId(int userId) {
		// TODO Auto-generated method stub
		return matchingRepository.findByUserId(userId);
	}

}
