package somoim.service;

import java.util.List;
import java.util.Optional;

import somoim.bean.Somoim;
import user.bean.User;

public interface SomoimService {

	public void write(Somoim somoim);

	public Optional<Somoim> getSomoimForm(Long id);

	public Optional<User> getUser(String userId);

	public List<Somoim> getSomoimList();

}
