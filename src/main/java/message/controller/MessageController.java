package message.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import message.bean.Message;
import message.config.KafkaConstants;
import message.service.MessageService;
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
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping(path = "message")
public class MessageController {
	@Autowired
	private MessageService messageService;

	@PostMapping(value = "send", consumes = "application/json", produces = "application/json")
	public void sendMessage(@RequestBody Message message) {
		messageService.send(message);
	}

	@MessageMapping("/sendMessage")
	@SendTo("/topic/group")
	public Message broadcastGroupMessage(@Payload Message message) {
		return message;
	}

}