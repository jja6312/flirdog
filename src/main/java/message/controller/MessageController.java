package message.controller;

import lombok.RequiredArgsConstructor;
import message.bean.MessageRoom;
import message.bean.SendMessageForm;
import message.service.MessageRoomService;
import message.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@EnableKafka
@CrossOrigin
public class MessageController {
	@Autowired
	private MessageService messageService;

	@Autowired
	private MessageRoomService messageRoomService;


	@PostMapping(path = "createRoom")
	public void createRoom(@RequestBody MessageRoom messageRoom, @RequestParam List<Integer> userIds) {
		messageRoomService.createRoom(messageRoom, userIds);
	}


	@MessageMapping("/{topic}")
	public void sendMessage(@DestinationVariable String topic, SendMessageForm message) throws Exception {
		System.out.println("sendmessage");
		messageService.send(topic, message);
	}

	@KafkaListener(id = "messageConsumer", topics = "messageRoom1")
	public void listen(@Payload SendMessageForm message,
								  @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) throws Exception{
		System.out.println("listen message");
		messageService.broadcastMessage("/sub/" + topic, message);
	}
}