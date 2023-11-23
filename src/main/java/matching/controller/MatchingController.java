package matching.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import matching.bean.Matching;
import matching.service.DateMatchingService;
import matching.service.DogsInfoService;
import user.bean.DogsInfo;

@CrossOrigin
@RestController
@RequestMapping(path = "date")
public class MatchingController {
	
	@Autowired
	private DogsInfoService dogsInfoService;	
	@Autowired
	private DateMatchingService dateMatchingService;
	
	@GetMapping(path = "getDogsInfoWithUserId", produces = "application/json;charset=UTF-8")
    public List<DogsInfo> getDogsInfoWithUserId() {
    
        List<DogsInfo> dogsInfoWithUserId = dogsInfoService.getDogsInfoListByUserId(1);
        return dogsInfoWithUserId;
	}
	
		
	@PostMapping(path= "dateWrite" , consumes = "multipart/form-data")
	public void dateWrite(@RequestPart("matchingDTO") Matching matchingDTO,
						  @RequestPart("dogsDTO") DogsInfo dogsDTO,
						  @RequestPart("matchingPurpose") String matchingPurpose,
						  @RequestPart("matchingState") String matchingState,
						  @RequestPart(value = "imgFiles", required = false) List<MultipartFile> imgFiles,
						  HttpSession session) throws IOException {
		
		dateMatchingService.dateWrite(matchingDTO, dogsDTO, matchingPurpose, matchingState, imgFiles, session);
	}
}
