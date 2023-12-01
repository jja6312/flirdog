package mypage.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import mypage.service.MypageUploadService;
import user.bean.DogsInfoDTO;
import user.bean.UserDTO;

@CrossOrigin
@RestController
@RequestMapping(path="mypage")
public class MypageUploadController {
	@Autowired
	private MypageUploadService mypageUploadService;
	
	@PostMapping(path="upload" , produces ="application/json;charset=UTF-8")
	public void upload( @RequestPart("dogsInfoDTO") DogsInfoDTO dogsInfoDTO,
						@RequestPart("img") List<MultipartFile> list,
						HttpSession session) {
		
//		System.out.println("@@@등록하러왔음");
//		System.out.println(dogsInfoDTO.getName());
		
		
		
		//실제 폴더
		String filePath = session.getServletContext().getRealPath("/public/storage");
		System.out.println("실제폴더11111111111 = " + filePath);
		
		File file;
		String originalFileName;
		String fileName;
		
		//파일명만 모아서 DB로 보내기
		List<DogsInfoDTO> dogsImageList = new ArrayList<DogsInfoDTO>();
		
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
			
			DogsInfoDTO dto = new DogsInfoDTO();
			dto.setAge(dogsInfoDTO.getAge());
			dto.setDogsBreed(dogsInfoDTO.getDogsBreed());
			dto.setGender(dogsInfoDTO.getGender());
			dto.setDogsInfo(dogsInfoDTO.getDogsInfo());
			dto.setIsNeutralized(dogsInfoDTO.getIsNeutralized());
			dto.setName(dogsInfoDTO.getName());
			dto.setScore(dogsInfoDTO.getScore());
			dto.setImage(originalFileName);
			dto.setImageFileName(fileName);
			
			dogsImageList.add(dto);
			
		}//for
		System.out.println(dogsImageList);
		
		//DB
		mypageUploadService.upload(dogsImageList);
	}

	@GetMapping(path="uploadList")
	public List<DogsInfoDTO>  uploadList(){
		return mypageUploadService.uploadList();
	}

	@GetMapping(path="getDogInfo")
	public Optional<DogsInfoDTO> getDogInfo(@RequestParam String id) {
	    Long userId = Long.parseLong(id);
		return mypageUploadService.getDogInfo(userId);
	}

	@DeleteMapping(path="deleteDogInfo")
	public void deleteDogInfo(@RequestParam String id) {
		
		Long userId = Long.parseLong(id);
		mypageUploadService.deleteDogInfo(userId);
	}

	
	@PostMapping(path="uploadProfile" , produces ="application/json;charset=UTF-8")
	public void upload( @RequestPart("userDTO") UserDTO userDTO,
						@RequestPart("img") List<MultipartFile> list,
						HttpSession session) {
		
		System.out.println("@@@등록하러왔음");
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
			dto.setName(userDTO.getName());
			dto.setNickname(userDTO.getNickname());
			dto.setPhone(userDTO.getPhone());
			dto.setIntroduce(userDTO.getIntroduce());
			dto.setEmail(userDTO.getEmail());
			dto.setImage(originalFileName);
			dto.setImageFileName(fileName);
			
			userImageList.add(dto);
			
		}//for
		System.out.println(userImageList);
		
		//DB
		mypageUploadService.uploadProfile(userImageList);
	}
}
