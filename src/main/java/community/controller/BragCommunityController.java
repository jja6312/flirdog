package community.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import community.bean.BragBoardCommentDTO;
import community.bean.BragBoardDTO;
import community.service.BragBoardService;
import community.service.BragUserInfoService;
import jakarta.servlet.http.HttpSession;
import user.bean.User;

@CrossOrigin
@RestController
@RequestMapping(path = "boastBoard")
public class BragCommunityController {
		@Autowired
		private BragBoardService bragBoardService;
		@Autowired
		private BragUserInfoService bragUserInfoService;
	
		//매칭글 작성
		@PostMapping(path="boastBoardWrite", produces ="application/json")
		public void boastBoardWrite(@RequestPart("boardWriteDTO") BragBoardDTO boardWriteDTO,
								  @RequestPart(value = "imgFiles", required = false) List<MultipartFile> imgFiles,
								  HttpSession session) throws IOException {
			
			System.out.println("데이터 들어오나?");
			bragBoardService.boastBoardWrite(boardWriteDTO, imgFiles, session);
		}
		
		//전체 리스트 조회
		@GetMapping(path="getBoastBoardList", produces = "application/json;charset=UTF-8")
		public List<BragBoardDTO> getBoastBoardList() {
			List<BragBoardDTO> bragBoardDTO = bragBoardService.getBoastBoardList();
			
			return bragBoardDTO;
		}
		
		//댓글 유저정보 조회
		@GetMapping(path = "getUser", produces = "application/json;charset=UTF-8")
		public Optional<User> getUser(@RequestParam("id") Long id){
			System.out.println("들어왔나?");
			Optional<User> getUser = bragUserInfoService.getUser(id);
			
			return getUser;
		}
		
		//댓글작성
		@PostMapping(path="boastCommentWrite", produces ="application/json")
		public void boastCommentWrite(@RequestBody BragBoardCommentDTO bragBoardCommentDTO) {
		    bragBoardService.boastCommentWrite(bragBoardCommentDTO);
		}
		
		//작성글의 댓글 조회
		@GetMapping(path="getBoastBoardCommentList", produces = "application/json;charset=UTF-8")
		public List<BragBoardCommentDTO> getBoastBoardCommentList(@RequestParam("boardId") Long boardId){
			System.out.println(boardId);
			List<BragBoardCommentDTO> bragBoardCommentDTO = bragBoardService.getBoastBoardCommentList(boardId);
			
			return bragBoardCommentDTO;
		}
		
		//작성글 상세보기
		@GetMapping(path="getBoastBoard", produces = "application/json;charset=UTF-8")
		public Optional<BragBoardDTO> getBoastBoard(@RequestParam("boardId") Long boardId){
			System.out.println(boardId);
			Optional<BragBoardDTO> bragBoardDTO = bragBoardService.getBoastBoard(boardId);
			
			return bragBoardDTO;
		}
		
		//댓글수 계산
		@GetMapping(path="getBoardCommentCount", produces = "application/json;charset=UTF-8")
		public int  getBoardCommentCount(@RequestParam("boardId") Long boardId){
			System.out.println(boardId);
			int bragBoardDTO = bragBoardService.getBoardCommentCount(boardId);
			
			return bragBoardDTO;
		}
		
		@DeleteMapping(path = "getBoastBoardDelete", produces = "application/json;charset=UTF-8")
		public void getBoastBoardDelete(@RequestParam("boardId") Long boardId) {
		    System.out.println(boardId);
		    bragBoardService.getBoastBoardDelete(boardId);
		}
}
