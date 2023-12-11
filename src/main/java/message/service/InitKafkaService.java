package message.service;

import jakarta.annotation.PostConstruct;
import message.bean.MessageRoom;
import message.config.ConsumerConfiguration;
import message.repository.MessageRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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

        if (!rooms.isEmpty()) {
            List<String> topics= rooms.stream()
                .map(room -> "messageRoom" + room.getId())
                .collect(Collectors.toList());
            consumerConfiguration.messageConsumerFactory(topics);
        }
    }
}
