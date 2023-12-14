package mypage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mypage.bean.MypageCommentDTO;
import mypage.repository.MypageCommentDTORepository;

@Service
public class MypageCommentServiceImpl implements MypageCommentService {

	@Autowired
	private MypageCommentDTORepository mypageCommentDTORepository;

	@Override
	public MypageCommentDTO getComment(Long userId) {
        return mypageCommentDTORepository.findById(userId).orElse(null);
	}

}
