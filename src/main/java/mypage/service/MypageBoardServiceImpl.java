package mypage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mypage.bean.MypageBoardDTO;
import mypage.repository.MypageBoardDTOEmailRepository;
import mypage.repository.MypageBoardDTORepository;

@Service
public class MypageBoardServiceImpl implements MypageBoardService {
	@Autowired
	private MypageBoardDTORepository mypageBoardDTORepository;
	@Autowired
	private MypageBoardDTOEmailRepository mypageBoardDTOEmailRepository;

	@Override
	public MypageBoardDTO getBoard(Long userId) {
        return mypageBoardDTORepository.findById(userId).orElse(null);
	}

	@Override
	public List<MypageBoardDTO> uploadListBoard(String email) {
		return mypageBoardDTOEmailRepository.findAllByEmail(email);
	}
	
}
