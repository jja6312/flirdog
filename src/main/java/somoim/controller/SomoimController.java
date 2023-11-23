package somoim.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import somoim.bean.Somoim;
import somoim.service.SomoimService;

@CrossOrigin
@RestController
@RequestMapping(path = "somoim")
public class SomoimController {
	
	@Autowired
	private SomoimService somoimService;
	
	@GetMapping("/")
	public String main() {
		return "/somoim";
	}
	
	@PostMapping(path="/somoimNewWrite", produces = "application/json;charset=UTF-8")
	public void somoimNewWrite(@ModelAttribute Somoim somoim) {
		System.out.println("컨트롤러" + somoim);
		somoimService.write(somoim);
	}
	
	@GetMapping("/getSomoimForm")
	public Optional<Somoim> getSomoimForm(@RequestParam Long id) {
		System.out.println("controller 소모임정보 : " + id);
		return somoimService.getSomoimForm(id);
	}
}
