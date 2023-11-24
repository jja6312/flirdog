package message.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import message.bean.JoinUser;
import message.bean.Message;
import message.bean.MessageRoom;
import message.config.ConsumerContainerFactory;
import message.config.KafkaConstants;
import message.repository.JoinUserRepository;
import message.repository.MessageRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import user.bean.User;
import user.repository.UserRepository;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageService {
    @Autowired
    private KafkaTemplate<String, Message> kafkaTemplate;
    @Autowired
    private ConsumerContainerFactory consumerContainerFactory;
    @Autowired
    private ConcurrentKafkaListenerContainerFactory<String, Message> kafkaListenerContainerFactory;
    @Autowired
    private MessageRoomRepository messageRoomRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JoinUserRepository joinUserRepository;

    public void send(Message message) {
        message = message.setSendDateToCurrentTime();
            System.out.println(message);
        try {
            kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, message).get(3, TimeUnit.SECONDS);
        } catch (ExecutionException e) {
            System.out.println(e);
        } catch (TimeoutException | InterruptedException e) {
            System.out.println(e);
        }
    }

    public void listen(String topic, String group) {
        consumerContainerFactory.createContainer(kafkaListenerContainerFactory, topic, group);
    }

    public void createRoom(MessageRoom messageRoom, List<Integer> userIds) {
        messageRoomRepository.save(messageRoom);
        List<User> users = userRepository.findAllById(userIds);
        joinRoom(messageRoom, users);
    }

    public void joinRoom(MessageRoom messageRoom, List<User> users) {
        for(User user : users) {
            joinRoom(messageRoom, user);
        }
    }

    public void joinRoom(MessageRoom messageRoom, User user) {
        JoinUser joinUser = JoinUser.builder()
                .user(user)
                .messageRoom(messageRoom)
                .build();
        joinUserRepository.save(joinUser);
    }
}
