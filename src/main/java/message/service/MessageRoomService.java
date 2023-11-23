package message.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import message.bean.JoinUser;
import message.bean.MessageRoom;
import message.repository.JoinUserRepository;
import message.repository.MessageRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import user.bean.User;
import user.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageRoomService {
    @Autowired
    private MessageRoomRepository messageRoomRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JoinUserRepository joinUserRepository;


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
