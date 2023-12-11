package admin.service;

import java.util.List;
import java.util.Optional;

import user.bean.DogsInfo;

public interface AdminDogService {

	public List<DogsInfo> getAllDogsWithUsers();

	public void dogDeleteSelected(String dogId);

	public void dogDelete(String dogId);

	public Optional<DogsInfo> getDog(String dogId);

	public void dogEdit(DogsInfo dogDTO);

}
