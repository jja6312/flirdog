package message.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import message.bean.Message;
import message.config.KafkaConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping(path = "message")
public class MessageController {
	@Autowired
	private KafkaTemplate<String, Message> kafkaTemplate;

	@PostMapping(value = "send", consumes = "application/json", produces = "application/json")
	public void sendMessage(@RequestBody Message message) {
		message = message.setSendDateToCurrentTime();
		System.out.println(message);

		try {
			kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, message).get();
		} catch (InterruptedException | ExecutionException e) {
			throw new RuntimeException(e);
		}
	}

	@MessageMapping("/sendMessage")
	@SendTo("/topic/group")
	public Message broadcastGroupMessage(@Payload Message message) {
		return message;
	}

}