package message.controller;

import lombok.RequiredArgsConstructor;
import message.bean.MatchingRoomInfo;
import message.bean.MessageRoom;
import message.service.MessageRoomService;
import message.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping(path = "message")
public class MessageController {
	@Autowired
	private MessageService messageService;

	@Autowired
	private MessageRoomService messageRoomService;

	@PostMapping(path = "createRoom")
	public void createRoom(@RequestParam Long[] userIds, @RequestParam String name) {
		messageRoomService.createRoom(name, userIds);
	}

	@PostMapping(path = "exitRoom")
	public void exitRoom(@RequestParam Long messageRoomId, @RequestParam Long userId) {
		messageRoomService.exitRoom(messageRoomId, userId);
	}

	@PostMapping(path = "joinRoom")
	public void joinRoom(@RequestParam Long messageRoomId, @RequestParam Long userId) {
		messageRoomService.joinRoom(messageRoomId, userId);
	}

	@GetMapping(path = "getMessages")
	public void getMessages(@RequestParam Long messageRoomId) {
		messageService.getMessage(messageRoomId);
	}

	@GetMapping(path = "getMessageRooms")
	public List<MatchingRoomInfo> getMessageRooms(@RequestParam Long userId) {
		return messageRoomService.getMessageRoomsByUserId(userId);
	}
}