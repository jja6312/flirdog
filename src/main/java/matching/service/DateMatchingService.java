package matching.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import matching.bean.Matching;
import user.bean.DogsInfo;

public interface DateMatchingService {

	public void dateWrite(Matching matchingDTO, DogsInfo dogsDTO, String matchingPurpose, String matchingState, List<MultipartFile> imgFiles, HttpSession session);
}
