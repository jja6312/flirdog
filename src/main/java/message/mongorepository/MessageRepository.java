package message.mongorepository;

import message.bean.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, Long>  {
    List<Message> findByMessageRoomId(Long messageRoomId);
}