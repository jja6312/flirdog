package somoim.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import matching.bean.Matching;
import somoim.bean.Somoim;
import somoim.bean.SomoimList;
import somoim.bean.SomoimListDTO;
import somoim.bean.SomoimPhoto;
import somoim.bean.SomoimPhotoComment;
import somoim.bean.SomoimRequest;
import somoim.service.SomoimService;
import user.bean.DogsInfo;
import user.bean.User;
import user.service.UserService;

@CrossOrigin
@RestController
@RequestMapping(path = "somoim")
public class SomoimController {
	
	@Autowired
	private SomoimService somoimService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/")
	public String main() {
		return "/somoim";
	}
	
	// 소모임 개설
	@PostMapping(path="/somoimNewWrite", 
			consumes = "multipart/form-data", 
			produces = "application/json;charset=UTF-8")
	public void somoimNewWrite(@RequestPart("updatedFormData") String updatedFormDataJson,
					@RequestPart("introducePhoto") MultipartFile introducePhoto,
					HttpSession session) {
		ObjectMapper objectMapper = new ObjectMapper();
		
		try {
	        SomoimRequest somoimRequest = objectMapper.readValue(updatedFormDataJson, SomoimRequest.class);
	        
	        Somoim somoim = somoimRequest.getSomoim();
	        User user = somoimRequest.getUser();
	        System.out.println("컨트롤 Somoim : " + somoim.toString());
	        System.out.println("컨트롤 User : " + user.getId());
	        System.out.println("컨트롤 IntroducePhoto : " + introducePhoto);
	        
	        Optional<User> optionalUser = userService.findId(user.getId());
	        System.out.println("컨트롤 optionalUser : " + optionalUser.get().toString());
	        
	        if (optionalUser.isPresent()) {
		        user = optionalUser.get();
		        somoim.setUser(user);
		        System.out.println(somoim.toString());
		    } else {
		        // optionalUser가 비어있는 경우에 대한 처리
		        throw new IllegalArgumentException("해당 ID의 사용자를 찾을 수 없습니다.");
		    }

		    if (somoim.getUser() == null) {
		        throw new IllegalArgumentException("Somoim에 대한 User 정보가 올바르게 설정되지 않았습니다.");
		    }//if
		    
			somoimService.write(somoim, introducePhoto, session);    
	    } catch (IOException e) {
	    	// JSON 변환 중 예외 발생 시 예외 처리
	        e.printStackTrace();
	    }//try-catch
	}
 
	
	// 소모임 디테일 조회
	@GetMapping("/getSomoimForm")
	public Optional<Somoim> getSomoimForm(@RequestParam Long id) {
		System.out.println("controller 소모임정보 : " + id);
		//return somoimService.getSomoimForm(id);
		
		Optional<Somoim> somoimOptional = somoimService.getSomoimForm(id);

	    // [여기에 Hibernate.initialize()를 호출해야 합니다.]
	     if (somoimOptional.isPresent()) {
	         String name = somoimOptional.get().getUser().getName();
	         Long userid = somoimOptional.get().getUser().getId();
	         String accountName = somoimOptional.get().getAccountName();
	         System.out.println("somoimOptional 이름 : " + name);
	         System.out.println("somoimOptional 아이디 : " + userid);
	         System.out.println("somoimOptional 개설자이름 : " + accountName);
	     }

	    return somoimOptional;
	}
	
	// 소모임 목록 조회
	@GetMapping(path="/getSomoimList")
	public List<Somoim> getSomoimList() {
		List<Somoim> somoimList = somoimService.getSomoimList();
		
		return somoimList;
	}
	
	//특정 회원 조회
	@PostMapping(path ="getUser", produces ="application/json;charset=UTF-8")
	public Optional<User> getUser(@RequestBody Map<String, String> requestBody) {
	    String userId = requestBody.get("userId");
	    System.out.println("!!!!!!!!!userid:" + userId);
	    Optional<User> user = somoimService.getUser(userId);

	    return user;
	}
	
	// 소모임 회원가입
	@PostMapping(path="/joinSomoim")
	public ResponseEntity<SomoimList> joinSomoim(@RequestBody Map<String, Long> request) {
		Long somoimId = request.get("somoimId");
	    Long userId = request.get("userId");
	    
		Optional<SomoimList> somoimList = somoimService.joinSomoim(somoimId, userId);
		
		if (somoimList.isPresent()) {
			Long joinUserId = somoimList.get().getUser().getId();
			System.out.println("컨트롤단 somoimList 유저 아이디 조회 : " + joinUserId);
			somoimList.get().setIsAdmin(0);
			return ResponseEntity.ok(somoimList.get());
		} else {
			return ResponseEntity.notFound().build(); // 또는 다른 적절한 응답 코드로 수정
		}
	}
	
	// 소모임 회원가입 여부 조회
	// @RequestParam(required=false)는 클라이언트측에서 값을 안받아도 된다.
	@GetMapping(path="/isSomoimMember")
	public int isSomoimMember(@RequestParam Long somoimId,
							  @RequestParam(required=false) Long userId){
		System.out.println("controller 소모임 회원가입 여부 조회용 아이디 : " + userId);
		Optional<SomoimList> isJoin = somoimService.isSomoimMember(somoimId, userId);
		System.out.println("controller isJoin : " + isJoin);
		// 미가입시 controller isJoin : Optional.empty 반환
		
		if (isJoin.isPresent()) {
	        SomoimList somoimList = isJoin.get();
	        int isAdmin = somoimList.getIsAdmin();
	        System.out.println("isAdmin: " + isAdmin);
	        return isAdmin;
	    } else {
	        System.out.println("해당 유저는 소모임에 가입되어 있지 않습니다.");
	        return 2; // 혹은 다른 기본값 또는 처리
	    }
	}
	
	// 소모임 회원수 조회
	@GetMapping(path="/getMemberCount")
	public Long getMemberCount(@RequestParam Long somoimId) {
		System.out.println("(컨트롤러) 회원수 조회하기전 소모임 아이디 : " + somoimId);
		Long memberCount = somoimService.getMemberCount(somoimId);
		System.out.println("(컨트롤러) 해당 소모임의 멤버수 : " + memberCount);
		return memberCount;
	}
	
	// 소모임 리스트 조회
	@GetMapping(path="/getSomoimAllList")
	public List<SomoimList> getSomoimAllList(@RequestParam Long somoimId) {
	    
		List<SomoimList> somoimAllList = somoimService.getSomoimAllList(somoimId);
		
		System.out.println("컨트롤단 소모임 리스트 모든 컬럼 조회 : " + somoimAllList.stream()
		        .map(somoimList -> new SomoimListDTO(somoimList.getId(), 
		        		somoimList.getSomoim().getId(), 
		        		somoimList.getUser().getId(), 
		        		somoimList.getIsAdmin()))
		        .collect(Collectors.toList()) );
		return somoimAllList;
	}
	
	// 소모임 가입회원 목록 조회
	@GetMapping(path="/getSomoimUserList")
	public List<User> getSomoimUserList(@RequestParam Long somoimId) {
		List<User> somoimList = somoimService.getSomoimUserList(somoimId);
		
		System.out.println("컨트롤단 소모임 회원목록 정보 조회 : " + somoimList);
		return somoimList;
	}
	
	// 소모임 독스인포 목록 조회
	@GetMapping(path="/getDogsInfo")
	public List<DogsInfo> getDogsInfo() {
		List<DogsInfo> dogsInfo = somoimService.getDogsInfo();
		
		System.out.println("컨트롤단 독스인포 조회 : " + dogsInfo.toString());
		return dogsInfo;
	}
	
	// 회원목록 삭제
	@Transactional
	@DeleteMapping(path="/deleteUser")
	public ResponseEntity<String> deleteUser(@RequestParam Long somoimId,
										@RequestParam Long userId) {
		System.out.println("컨트롤러 회원목록 삭제 : " + 
				"somoimId : " + somoimId + " / userId : " + userId);
		
		try {
	        String result = somoimService.deleteUser(somoimId, userId);
	        return ResponseEntity.ok(result);
	    } catch (Exception e) {
	        e.printStackTrace(); // 또는 로깅
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("강퇴 실패");
	    }
	}
	
	
	// 사진첩 사진 등록
	@PostMapping(path = "/somoimPhotoUpload", consumes = "multipart/form-data")
	public void somoimPhotoUpload(@RequestPart("pinDetails") SomoimPhoto pinDetails,
	                               @RequestPart(value = "imgFiles", required = true) List<MultipartFile> imgFiles,
	                               HttpSession session) throws IOException {
	    
		System.out.println("###somoimPhoto: "+pinDetails.getPhotoLink());
		
		ObjectMapper objectMapper = new ObjectMapper();
//	    SomoimPhoto somoimPhoto = objectMapper.readValue(pinDetails, SomoimPhoto.class);
	    
	    System.out.println("컨트롤단 somoimPhoto : " + pinDetails);
	    
	    somoimService.somoimPhotoUpload(pinDetails, imgFiles, session);
	}
	
	
//	@PostMapping(path= "/somoimPhotoUpload" , consumes = "multipart/form-data")
//	public void somoimPhotoUpload(@RequestPart("pinDetails") SomoimPhoto somoimPhoto,
//						  @RequestPart(value = "imgFiles", required = true) List<MultipartFile> imgFiles,
//						  HttpSession session) throws IOException {
//		
//		System.out.println("!!!");
//		System.out.println("컨트롤러단 somoimPhoto : " + somoimPhoto);
//
//		somoimService.somoimPhotoUpload(somoimPhoto, imgFiles, session);
//	}
	
	// 사진첩 목록 조회
	@GetMapping(path="/somoimPhotoList", produces = "application/json;charset=UTF-8")
	public List<SomoimPhoto> somoimPhotoList(@RequestParam("id") Long somoimId) {
		List<SomoimPhoto> somoimPhoto = somoimService.somoimPhotoList(somoimId);
		System.out.println("컨트롤단 사진첩 목록 조회 : " + somoimPhoto);
		return somoimPhoto;
	}
	
	// 사진첩 게시글 삭제
	@DeleteMapping(path="/somoimPhotoDelete")
	public void somoimPhotoDelete(
					@RequestParam("id") Long id,
					@RequestParam("userId") Long userId, 
					@RequestParam("somoimId") Long somoimId) {
		somoimService.somoimPhotoDelete(id, userId, somoimId);
	}
	
	// 사진첩 게시글 조회수
	@PostMapping("/somoimPhotoCount")
    public Optional<SomoimPhoto> somoimPhotoCount(@RequestParam Long id) {
		
		Optional<SomoimPhoto> count = somoimService.somoimPhotoCount(id);
		System.out.println("사진첩 조회수 응답 : " + count);
        return count;
    }
	
	// 사진첩 좋아요 등록 여부 조회
	@PostMapping("/somoimPhotoLikeStatus")
    public ResponseEntity<Map<String, Boolean>> somoimPhotoLikeStatus(
    		@RequestBody Map<String, Long> request) {
		Long userId = request.get("userId");
	    Long photoId = request.get("photoId");
		System.out.println("사진첩 좋아요 userId 잘 받아왔나 ? " + userId);
		System.out.println("사진첩 좋아요 photoId 잘 받아왔나 ? " + photoId);
		
        boolean isLiked = somoimService.isSomoimPhotoLiked(userId, photoId);
        
        Map<String, Boolean> response = Collections.singletonMap("isLiked", isLiked);
        System.out.println("사진첩 좋아요 여부 확인" + response);
        
        return ResponseEntity.ok(response);
    }
	
	// 사진첩 좋아요 등록 및 취소
	@RequestMapping(value = "/somoimPhotoLikes", method = {RequestMethod.POST, RequestMethod.DELETE})
	public ResponseEntity<Void> somoimPhotoLikes(@RequestBody Map<String, Long> request, 
													HttpServletRequest httpRequest) {
	    Long userId = request.get("userId");
	    Long photoId = request.get("photoId");
	    System.out.println("좋아요 등록 및 취소 userId 잘 받아왔나 ? " + userId);
		System.out.println("좋아요 등록 및 취소 photoId 잘 받아왔나 ? " + photoId);
		
	    if (httpRequest.getMethod().equals("POST")) {
	        // 좋아요 등록
	        somoimService.somoimPhotoLikes(userId, photoId);
	    } else if (httpRequest.getMethod().equals("DELETE")) {
	        // 좋아요 취소
	        somoimService.somoimPhotoUnLikes(userId, photoId);
	    }
	    return ResponseEntity.ok().build();
	}
	
	// 사진첩 좋아요 개수 조회
	@GetMapping(path="/somoimPhotoLikeCount")
	public Long somoimPhotoLikeCount(@RequestParam Long photoId) {
		System.out.println("좋아요 개수 조회 게시글 아이디 : " + photoId);
		Long returnLikeCount = somoimService.somoimPhotoLikeCount(photoId);
		
		return returnLikeCount;
	}
	
	// 모임 하이라이트를 위한 사진첩 전체 조회
	@GetMapping(path="/somoimPhotoListAll", produces = "application/json;charset=UTF-8")
	public List<SomoimPhoto> somoimPhotoListAll() {
		
		List<SomoimPhoto> somoimPhotoAll = somoimService.somoimPhotoListAll();
		System.out.println("컨트롤단 사진첩 전체 목록 조회 : " + somoimPhotoAll);
		
		return somoimPhotoAll;
	}
	
	// 사진첩 수정
//	@PostMapping("/somoimPhotoUpdate")
//	public ResponseEntity<String> somoimPhotoUpdate(@RequestPart("pinDetails") SomoimPhoto pinDetails,
//	                                                @RequestPart(value = "imgFiles", required = false) List<MultipartFile> imgFiles,
//	                                                HttpSession session) {
//	    
//		System.out.println("컨트롤단 pinDetails : " + pinDetails);
//		if (imgFiles != null) {
//	        for (MultipartFile img : imgFiles) {
//	            System.out.println("컨트롤단 imgFiles : " + img);
//	        }
//	    }
//		
//		try {
//	        somoimService.somoimPhotoUpdate(pinDetails, imgFiles, session);
//	        return ResponseEntity.ok("Somoim photo updated successfully.");
//	    } catch (Exception e) {
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating somoim photo.");
//	    }
//	}
	
	// 사진첩 수정
	@PostMapping("/somoimPhotoUpdate")
	public ResponseEntity<String> somoimPhotoUpdate(
	        @RequestPart("pinDetails") SomoimPhoto pinDetails,
	        @RequestParam(value = "imgFiles", required = false) List<MultipartFile> imgFiles,
	        @RequestParam(value = "newImgFiles", required = false) List<MultipartFile> newImgFiles,
	        HttpSession session) {
	    
		System.out.println("컨트롤단 pinDetails : " + pinDetails);
	    if (imgFiles != null) {
	        for (MultipartFile img : imgFiles) {
	            System.out.println("컨트롤단 imgFiles : " + img);
	        }
	    }
	    
	    if (newImgFiles != null) {
	        for (MultipartFile newImg : newImgFiles) {
	            System.out.println("컨트롤단 newImgFiles : " + newImg);
	        }
	    }

	    try {
	        somoimService.somoimPhotoUpdate(pinDetails, imgFiles, newImgFiles, session);
	        return ResponseEntity.ok("Somoim photo updated successfully.");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating somoim photo.");
	    }
	}
	
	// 댓글 등록
//	@PostMapping("/somoimPhotoComment")
//	public void somoimPhotoReply(@RequestBody SomoimPhotoComment comment) {
//	    System.out.println("컨트롤단 comment : " + comment.getComment());
//	    System.out.println("컨트롤단 comment id : " + comment.getId());
//	    System.out.println("컨트롤단 comment somoimId : " + comment.getSomoim());
//	    System.out.println("컨트롤단 comment somoimPhoto : " + comment.getSomoimPhoto());
//
//	    somoimService.somoimPhotoReply(comment);
//	}
	
	// 댓글 등록
	@PostMapping("/somoimPhotoComment")
	public void somoimPhotoReply(@RequestBody Map<String, Object> requestBody) {
	    String comment = (String) requestBody.get("comment");
	    Long userId = requestBody.get("userId") != null ? Long.parseLong(requestBody.get("userId").toString()) : null;
	    Long somoimId = requestBody.get("somoimId") != null ? Long.parseLong(requestBody.get("somoimId").toString()) : null;
	    Long photoId = requestBody.get("photoId") != null ? Long.parseLong(requestBody.get("photoId").toString()) : null;

	    System.out.println("컨트롤단 comment : " + comment);
	    System.out.println("컨트롤단 comment id : " + userId);
	    System.out.println("컨트롤단 comment somoimId : " + somoimId);
	    System.out.println("컨트롤단 comment somoimPhoto : " + photoId);
	    
	    somoimService.somoimPhotoReply(comment, userId, somoimId, photoId);
	    
	    
//	    SomoimPhotoComment createdComment = new SomoimPhotoComment();
//		    createdComment.setComment(createdComment.getComment());
//		    createdComment.setId(createdComment.getId());
//		    createdComment.setSomoim(createdComment.getSomoim());
//		    createdComment.setUser(createdComment.getUser());
//	    System.out.println("컨트롤단 createdComment : " + createdComment);
	}

	
//	@PostMapping("/somoimPhotoComment")
//	public void somoimPhotoReply(
//	        @RequestParam("comment") String comment,
//	        @RequestParam("userId") Long userId,
//	        @RequestParam("somoimId") Long somoimId,
//	        @RequestParam("photoId") Long photoId) {
//
//	    System.out.println("컨트롤단 comment : " + comment);
//
//	    somoimService.somoimPhotoReply(comment, userId, somoimId, photoId);
//	    
//	    SomoimPhotoComment createdComment = new SomoimPhotoComment();
//	    createdComment.setComment(comment);
//	    System.out.println("컨트롤단 createdComment : " + createdComment);
//	   
//	}
	
	// 댓글 목록 조회
	@GetMapping(path="/somoimPhotoComments")
	public List<SomoimPhotoComment> getSomoimPhotoReply(@RequestParam(value="photoId") Long somoimPhotoId) {
		List<SomoimPhotoComment> reaplyList = somoimService.getSomoimPhotoReply(somoimPhotoId);
		
		for(SomoimPhotoComment somoimPhotoComment : reaplyList) {
			System.out.println("컨트롤단 SomoimPhotoComment 리턴정보" + somoimPhotoComment);
		}
		
		return reaplyList;
	}
	
	// 사진첩 댓글 삭제
	@DeleteMapping(path="/photoReplyDelete")
	public void photoReplyDelete(@RequestParam(value="commentId") Long commentId,
								 @RequestParam(value="userId") Long userId) {
		System.out.println("사진첩 댓글삭제 컨트롤단에서 CommentId 확인 : " + commentId + 
							" & UserId 확인 : " + userId);
		somoimService.photoReplyDelete(commentId, userId);
	}


}
