package message.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import message.bean.Message;
import message.bean.MessageRoom;
import message.service.MessageRoomService;
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
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {
	@Autowired
	private MessageService messageService;

	@Autowired
	private MessageRoomService messageRoomService;


	@PostMapping(path = "createRoom")
	public void createRoom(@RequestBody MessageRoom messageRoom, @RequestParam List<Integer> userIds) {
		messageRoomService.createRoom(messageRoom, userIds);
	}


	@MessageMapping("/publish/{topic}")
	public void sendMessage(@DestinationVariable String topic, Message message) {
		System.out.println("sendmessage");
		messageService.send(topic, message);
	}

	@MessageMapping("/subscribe/{consumerGroupId}")
	public void listen(@DestinationVariable String consumerGroupId, Message message) {
		messageService.listen(consumerGroupId);
	}
}