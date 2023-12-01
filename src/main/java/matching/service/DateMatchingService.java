package matching.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import matching.bean.Matching;
import matching.bean.MatchingDTO;
import user.bean.DogsInfo;


public interface DateMatchingService {

	public void dateWrite(Matching matchingDTO, DogsInfo dogsDTO, String userId, String matchingPurpose, String matchingState, List<MultipartFile> imgFiles, HttpSession session);

	public void dateWriteTest(MatchingDTO matchingDTO, List<MultipartFile> imgFiles, HttpSession session);

	public List<MatchingDTO> getAllMatchingList();

	public Optional<MatchingDTO> dateReadMore(String id);

	public void dateUpdate(MatchingDTO matchingDTO, List<MultipartFile> imgFiles, HttpSession session);

	public List<MatchingDTO> getTopMatchingThree();
}
