package mypage.service;

import java.util.List;

import mypage.bean.MypageBoardDTO;

public interface MypageBoardService {

	public MypageBoardDTO getBoard(Long userId);

	public List<MypageBoardDTO> uploadListBoard(String email);
	
}
