package message.service;

import access.service.AccessService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import message.bean.JoinUser;
import message.bean.MatchingRoomInfo;
import message.bean.MessageRoom;
import message.config.ConsumerConfiguration;
import message.repository.JoinUserRepository;
import message.repository.MessageRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import user.bean.User;
import user.repository.UserRepository;

import java.util.Arrays;
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

    @Autowired
    private AccessService accessService;

    public void createRoom(String name, Long[] userIds) {
        if (isExistRoom(name)) {
            return;
        }else {
            MessageRoom messageRoom = MessageRoom.builder()
                  .name(name)
                  .build();
            messageRoomRepository.save(messageRoom);
            List<User> users = userRepository.findAllById(Arrays.stream(userIds).collect(Collectors.toList()));
            joinRoom(messageRoom, users);
            consumerConfiguration.messageConsumerFactory("messageRoom" + messageRoom.getId());
        }
    }

    public boolean isExistRoom(String name) {
        if(messageRoomRepository.countByName(name) == 1) {
            return true;
        }
        return false;
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


    public List<MatchingRoomInfo> getMessageRoomsByUserId(Long userId) {
        List<JoinUser> joinUsers = joinUserRepository.findByUserId(userId);
        return joinUsers.stream()
                .map(joinUser -> {
                    MessageRoom messageRoom = joinUser.getMessageRoom();
                    List<User> users = joinUser.getMessageRoom().getJoinUsers().stream()
                            .map(JoinUser::getUser)
                            .collect(Collectors.toList());

                    User user = users.stream().filter(u -> u.getId() == userId).findFirst().orElse(null);
                    String userImage = accessService.getDogsInfoArray(""+user.getId()).get().getImageAiProfile();
                    User otherUser = users.stream().filter(u -> u.getId() != userId).findFirst().orElse(null);
                    String otherUserImage = accessService.getDogsInfoArray(""+otherUser.getId()).get().getImageAiProfile();

                    return new MatchingRoomInfo(messageRoom.getId(), messageRoom.getName(), user, userImage, otherUser, otherUserImage);
                })
                .collect(Collectors.toList());
    }
}
