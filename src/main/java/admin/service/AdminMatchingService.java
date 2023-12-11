package admin.service;

import java.util.List;

import matching.bean.MatchingDTO;

public interface AdminMatchingService {

	List<MatchingDTO> getMatchingList();

	void matchingDelete(String matchingId);

	void matchingDeleteSelected(String matchingId);

}
