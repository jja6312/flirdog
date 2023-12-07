package message.service;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import message.bean.Message;
import message.bean.MessageRoom;
import message.mongorepository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import user.bean.User;

@Service
@Slf4j
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> getMessage(Long messageRoomId) {
        return messageRepository.findByMessageRoomId(messageRoomId);
    }

}