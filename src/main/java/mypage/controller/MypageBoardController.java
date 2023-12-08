package mypage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mypage.bean.MypageBoardDTO;
import mypage.bean.MypageCommentDTO;
import mypage.service.MypageBoardService;
import mypage.service.MypageCommentService;
import user.bean.DogsInfoDTO;


@CrossOrigin
@RestController
@RequestMapping(path = "mypage")
public class MypageBoardController {
	
	@Autowired
	private MypageBoardService mypageBoardService;
	

	@GetMapping(path = "getBoard") //게시글 단건조회. getUserProfileTest 이거 참조했음.
	public MypageBoardDTO getBoard(@RequestParam String userIdStr) {
	    Long userId = Long.parseLong(userIdStr);
	    MypageBoardDTO boardProfile = mypageBoardService.getBoard(userId);
	    return boardProfile;
	}

	@GetMapping(path="uploadListBoard")
	public List<MypageBoardDTO> uploadListBoard(@RequestParam String email){
		System.out.println("이메일은 뭔가" + email);
		return mypageBoardService.uploadListBoard(email);
	}

}
