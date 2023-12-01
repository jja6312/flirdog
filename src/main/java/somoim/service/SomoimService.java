package somoim.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import somoim.bean.Somoim;
import somoim.bean.SomoimList;
import somoim.bean.SomoimListDTO;
import user.bean.User;

public interface SomoimService {

	public void write(Somoim somoim, MultipartFile introducePhoto, HttpSession session);

	public Optional<Somoim> getSomoimForm(Long id);

	public Optional<User> getUser(String userId);

	public List<Somoim> getSomoimList();

	public Optional<SomoimList> joinSomoim(Long somoimId, Long userId);

	public Optional<SomoimList> isSomoimMember(Long userId, Long somoimId);
	
	//public List<SomoimListDTO> somoimMemberIs(Long id);

}
