package mypage.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import mypage.service.MypageUserDTOUploadService;
import user.bean.UserDTO;

@CrossOrigin
@RestController
@RequestMapping(path="mypage")
public class MypageUploadUserDTOController {
	@Autowired
	private MypageUserDTOUploadService mypageUserDTOUploadService;
	
	@PostMapping(path="uploadUser" , produces ="application/json;charset=UTF-8")
	public void upload( @RequestPart("userDTO") UserDTO userDTO,
						@RequestPart("img") List<MultipartFile> list,
						HttpSession session) {
		
		System.out.println("MypageUploadUserDTOController 등록하러왔음");
		System.out.println(userDTO.getName());
		
		
		
		//실제 폴더
		String filePath = session.getServletContext().getRealPath("/public/storage");
		System.out.println("실제폴더11111111111 = " + filePath);
		
		File file;
		String originalFileName;
		String fileName;
		
		//파일명만 모아서 DB로 보내기
		List<UserDTO> userImageList = new ArrayList<UserDTO>();
		
		for(MultipartFile img : list) {
			originalFileName = img.getOriginalFilename();
			System.out.println(originalFileName);
		
			fileName = "noname";
			
			file = new File(filePath, originalFileName);
			
			
			try {
				img.transferTo(file);
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			UserDTO dto = new UserDTO();
			dto.setNickname(userDTO.getNickname());
			dto.setName(userDTO.getName());
			dto.setPhone(userDTO.getPhone());
			dto.setIntroduce(userDTO.getIntroduce());
			dto.setEmail(userDTO.getEmail());
			dto.setImage(originalFileName);
			dto.setImageFileName(fileName);
			dto.setId(userDTO.getId());
			dto.setPasswd(userDTO.getPasswd());
			dto.setAddresses(userDTO.getAddresses());
			dto.setCommunities(userDTO.getCommunities());
			dto.setCommunityScore(userDTO.getCommunityScore());
			dto.setDogsInfos(userDTO.getDogsInfos());
			dto.setMatching(userDTO.getMatching());
			dto.setPointChargings(userDTO.getPointChargings());
			dto.setPoint(userDTO.getPoint());
			dto.setPopularity(userDTO.getPopularity());
			dto.setUserRole(userDTO.getUserRole());
			dto.setImageFileName(userDTO.getImageFileName());
			userImageList.add(dto);
			
		}//for
		System.out.println(userImageList);
		
		//DB
		mypageUserDTOUploadService.uploadUser(userImageList);
	}

}
