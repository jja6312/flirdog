package message.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import message.bean.JoinUser;
import message.bean.MessageRoom;
import message.config.ConsumerConfiguration;
import message.repository.JoinUserRepository;
import message.repository.MessageRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import user.bean.User;
import user.repository.UserRepository;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class MessageRoomService {
    @Autowired
    private MessageRoomRepository messageRoomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JoinUserRepository joinUserRepository;

    @Autowired
    private ConsumerConfiguration consumerConfiguration;

    public void createRoom(MessageRoom messageRoom, List<Long> userIds) {
        messageRoomRepository.save(messageRoom);
        List<User> users = userRepository.findAllById(userIds);
        joinRoom(messageRoom, users);
        consumerConfiguration.messageConsumerFactory("messageRoom" + messageRoom.getId());
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

    public void joinRoom(Long messageRoomId, List<Long> userIds) {
        for(Long userId : userIds) {
            joinRoom(messageRoomId, userId);
        }
    }

    public void joinRoom(Long messageRoomId, Long userId) {
        MessageRoom messageRoom = messageRoomRepository.findById(messageRoomId).get();
        User user = userRepository.findById(userId).get();
        JoinUser joinUser = JoinUser.builder()
            .user(user)
            .messageRoom(messageRoom)
            .build();
        joinUserRepository.save(joinUser);
    }

    public void exitRoom(Long messageRoomId, Long userId) {
        joinUserRepository.findByMessageRoomIdAndUserId(messageRoomId, userId).ifPresent(joinUserRepository::delete);
    }


    public List<MessageRoom> getMessageRooms(Long userId) {
        return joinUserRepository.findByUserId(userId).stream()
                .map(JoinUser::getMessageRoom)
                .collect(Collectors.toList());
    }
}
