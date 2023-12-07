package matching.service;

import java.util.List;

import user.bean.DogsInfo;
import user.bean.User;

public interface DogsInfoService {

	public List<DogsInfo> getDogsInfoListByUserId(long id);
}
