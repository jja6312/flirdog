package somoim.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import somoim.bean.Somoim;
import somoim.bean.SomoimList;
import somoim.bean.SomoimListDTO;
import somoim.bean.SomoimPhoto;
import user.bean.DogsInfo;
import user.bean.User;

public interface SomoimService {

	public void write(Somoim somoim, MultipartFile introducePhoto, HttpSession session);

	public Optional<Somoim> getSomoimForm(Long id);

	public Optional<User> getUser(String userId);

	public List<Somoim> getSomoimList();

	public Optional<SomoimList> joinSomoim(Long somoimId, Long id);

	public Optional<SomoimList> isSomoimMember(Long userId, Long somoimId);

	public List<SomoimList> getSomoimAllList(Long somoimId);
	
	public Long getMemberCount(Long somoimId);

	public List<User> getSomoimUserList(Long somoimId);

	public List<DogsInfo> getDogsInfo();

	public String deleteUser(Long somoimId, Long userId);

	public void somoimPhotoUpload(SomoimPhoto somoimPhoto, List<MultipartFile> imgFiles, HttpSession session);

	public List<SomoimPhoto> somoimPhotoList(Long somoimId);
	
	
	//public List<SomoimListDTO> somoimMemberIs(Long id);

}
