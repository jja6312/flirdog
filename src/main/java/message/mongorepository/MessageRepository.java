package message.mongorepository;

import java.util.List;
import message.bean.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends MongoRepository<Message, Long>  {
    List<Message> findByMessageRoomId(Long messageRoomId);
}