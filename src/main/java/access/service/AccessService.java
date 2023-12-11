package access.service;

import java.util.List;
import java.util.Optional;

import access.bean.JoinRequestDTO;
import community.bean.BragBoardDTO;
import jakarta.servlet.http.HttpSession;
import matching.bean.MatchingDTO;
import product.bean.Product;
import user.bean.DogsInfo;
import user.bean.User;

public interface AccessService {

	Optional<User> login(String email, String passwd);

	Optional<User> findId(Long id);

	List<DogsInfo> getFiveDogsInfo();

	void processJoin(JoinRequestDTO joinRequest, HttpSession session);

	boolean checkEmailExist(String email);

	void saveDogScore(String dogsId, String score);

	void updatePwd(String email, String passwd);

	Optional<User> getUserInfoAsDogId(String dogId);

	Optional<MatchingDTO> getMatchingTable(String dogName, String userId);

	List<User> getUserInfoArray();

	Optional<DogsInfo> getDogsInfoArray(String userId);

	List<User> getUserInfoArrayLocation(String location);

	List<Product> getProductInfoArray();

	List<BragBoardDTO> getBragBoard();

	List<BragBoardDTO> getBragBoardClosestDate10();

	List<BragBoardDTO> getBoardList();

	void boardDelete(String boardId);

	void boardDeleteSelected(String boardId);

	List<DogsInfo> getDogsInfoArrayByBeautyScore();

	Optional<User> getUserInfoArrayOfThreeDogsInfo(String dogId);


	List<DogsInfo> getDogsInfoByLocationAndBeautyScore(String location);

	

}
