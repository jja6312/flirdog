package matching.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(path = "date")
public class MatchingController {
	
	@PostMapping("list")
	public void dateList() {
	}
	@PostMapping("Write")
	public void dateWrite() {
	}
	@PostMapping("dateReadMore")
	public void dateReadMore() {
	}
	@PostMapping("update")
	public void dateUpdate() {
	}
}
