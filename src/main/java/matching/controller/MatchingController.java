package matching.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(path = "date")
public class MatchingController {
	
	@GetMapping("list")
	public String dateList() {
		return "/date/dateList";
	}
	@GetMapping("Write")
	public String dateWrite() {
		return "/date/dateWrite";
	}
	@GetMapping("dateReadMore")
	public String dateReadMore() {
		return "/date/dateReadMore";
	}
	@GetMapping("update")
	public String dateUpdate() {
		return "/date/dateUpdate";
	}
}
