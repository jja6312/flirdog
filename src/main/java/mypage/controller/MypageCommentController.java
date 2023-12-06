package mypage.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mypage.bean.MypageCommentDTO;
import mypage.service.MypageCommentService;


@CrossOrigin
@RestController
@RequestMapping(path = "mypage")
public class MypageCommentController {

	@Autowired
	private MypageCommentService mypageCommentService;
	

	@GetMapping(path = "getComment")
	public MypageCommentDTO getComment(@RequestParam String userIdStr) {
	    Long userId = Long.parseLong(userIdStr);
	    MypageCommentDTO commentProfile = mypageCommentService.getComment(userId);
	    return commentProfile;
	}
}
