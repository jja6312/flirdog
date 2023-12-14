package message.repository;

import java.util.List;
import java.util.Optional;
import message.bean.JoinUser;
import message.bean.MessageRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JoinUserRepository extends JpaRepository<JoinUser, Integer> {
    Optional<JoinUser> findByMessageRoomIdAndUserId(Long messageRoomId, Long userId);

    List<JoinUser> findByUserId(Long userId);
}
