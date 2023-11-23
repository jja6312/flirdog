package somoim.service;

import java.util.Optional;

import somoim.bean.Somoim;

public interface SomoimService {

	public void write(Somoim somoim);

	public Optional<Somoim> getSomoimForm(Long id);

}
