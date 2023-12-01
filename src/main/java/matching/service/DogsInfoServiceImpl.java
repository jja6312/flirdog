package matching.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import matching.repository.MatchingRepository;
import user.bean.DogsInfo;
import user.bean.Score;
import user.bean.User;

@Service
public class DogsInfoServiceImpl implements DogsInfoService {
	@Autowired
	private MatchingRepository matchingRepository;

	@Override
	public List<DogsInfo> getDogsInfoListByUserId(int userId) {
		List<DogsInfo> dogsInfoList = matchingRepository.findByUserId(userId);
	    
	    if (dogsInfoList.isEmpty()) {
	        // 해당 ID에 해당하는 DogsInfo가 없는 경우 처리
	        // ...
	    } else {
	        // DogsInfo가 존재하는 경우에 수행할 작업
	        for (DogsInfo dogsInfo : dogsInfoList) {
	            Score score = dogsInfo.getScore();
	            Double totalScore = score.getTotalScore();
	            int voteCount = score.getVoteCount();
	            Double averageScore = score.getAverageScore();
	        }
	    }
	    
	    // 결과 반환
	    return dogsInfoList;
	}
}
