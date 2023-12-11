package message.repository;

import message.bean.JoinUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JoinUserRepository extends JpaRepository<JoinUser, Integer> {
    Optional<JoinUser> findByMessageRoomIdAndUserId(Long messageRoomId, Long userId);

    List<JoinUser> findByUserId(Long userId);
}
