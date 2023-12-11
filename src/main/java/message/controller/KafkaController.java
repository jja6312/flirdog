package message.controller;

import lombok.RequiredArgsConstructor;
import message.bean.MessageRoom;
import message.bean.SendMessageForm;
import message.config.ConsumerConfiguration;
import message.service.KafkaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@CrossOrigin
public class KafkaController {
	@Autowired
	private KafkaService kafkaService;

	@Autowired
	private ConsumerConfiguration consumerConfiguration;

	@MessageMapping("/{topic}")
	public void sendMessage(@DestinationVariable String topic, SendMessageForm message) throws Exception {
		kafkaService.send(topic, message);
	}

	@KafkaListener(id = "newRoomEventListener", topics = "flirdog.new_room.newRoom", containerFactory = "kafkaListenerContainerFactory")
	public void listen(@Payload MessageRoom messageRoom) throws Exception{
		consumerConfiguration.messageConsumerFactory("messageRoom" + messageRoom.getId());
	}
}