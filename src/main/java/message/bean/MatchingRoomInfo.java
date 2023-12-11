package message.bean;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import user.bean.User;

@Component
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class MatchingRoomInfo {
    private Long id;

    private String name;

    private User user;

    private User otherUser;

    @Builder
    public MatchingRoomInfo(Long id, String name, User user, User otherUser) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.otherUser = otherUser;
    }
}
