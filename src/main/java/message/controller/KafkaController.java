package message.controller;

import lombok.RequiredArgsConstructor;
import message.bean.MessageRoom;
import message.bean.SendMessageForm;
import message.config.ConsumerConfiguration;
import message.service.KafkaService;
import message.service.MessageRoomService;
import message.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

	@KafkaListener(id = "newRoomEventListener", topics = "newRoom", containerFactory = "kafkaListenerContainerFactory")
	public void listen(@Payload MessageRoom messageRoom) throws Exception{
		//consumerConfiguration.messageConsumerFactory("messageRoom" + messageRoom.getId());
	}
}