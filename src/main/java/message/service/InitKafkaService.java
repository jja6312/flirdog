package message.service;

import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;
import message.bean.MessageRoom;
import message.bean.SendMessageForm;
import message.config.ConsumerConfiguration;
import message.repository.MessageRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InitKafkaService {
    @Autowired
    private ConsumerConfiguration consumerConfiguration;

    @Autowired
    private MessageRoomRepository messageRoomRepository;

    @PostConstruct
    @Transactional
    public void initConsumer() {
        List<MessageRoom> rooms = messageRoomRepository.findAll();

        MessageRoom messageRoom = MessageRoom.builder()
                                    .name("kafka")
                                    .build();

        // MessageRoom을 저장
        messageRoomRepository.save(messageRoom);


        if (!rooms.isEmpty()) {
            List<String> topics= rooms.stream()
                .map(room -> "messageRoom" + room.getId())
                .collect(Collectors.toList());
            consumerConfiguration.messageConsumerFactory(topics);
        }
    }
}
