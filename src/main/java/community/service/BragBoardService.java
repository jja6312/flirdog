package community.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import community.bean.BragBoardCommentDTO;
import community.bean.BragBoardDTO;
import jakarta.servlet.http.HttpSession;

public interface BragBoardService {

	public void boastBoardWrite(BragBoardDTO boardWriteDTO, List<MultipartFile> imgFiles, HttpSession session);

	public List<BragBoardDTO> getBoastBoardList();

	public void boastCommentWrite(BragBoardCommentDTO bragBoardCommentDTO);

	public List<BragBoardCommentDTO> getBoastBoardCommentList(Long boardId);

	public Optional<BragBoardDTO> getBoastBoard(Long boardId);

	public int getBoardCommentCount(Long boardId);

	public void getBoastBoardDelete(Long boardId);

	public List<BragBoardDTO> getSearchBoastBoardList(String searchValue, String inputValue);

}
