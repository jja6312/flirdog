package message.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import message.bean.Message;
import message.bean.MessageRoom;
import message.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping(path = "message")
public class MessageController {
	@Autowired
	private MessageService messageService;

	@Autowired
	private SimpMessagingTemplate messageTemplate;

	@PostMapping(path = "createRoom")
	public void createRoom(@RequestBody MessageRoom messageRoom, @RequestParam List<Integer> userIds) {
		messageService.createRoom(messageRoom, userIds);
	}


	@MessageMapping("/publish/chat{chatRoomId}-{userId}")
	public void sendMessage(@DestinationVariable String chatRoomId, @DestinationVariable String userId, Message message) {
		messageService.send(message);
	}



	public void broadcastMessageToClients(Message message) {
		messageTemplate.convertAndSend("/subscribe/chat", message);
	}
}