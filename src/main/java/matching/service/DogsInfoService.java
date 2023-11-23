package matching.service;

import java.util.List;

import user.bean.DogsInfo;
public interface DogsInfoService {

	public List<DogsInfo> getDogsInfoListByUserId(int userId);
}
