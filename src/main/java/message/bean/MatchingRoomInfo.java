package message.bean;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import user.bean.User;

@Getter
@Component
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class MatchingRoomInfo {
    private Long id;

    private String name;

    private User user;

    private String userImage;

    private User otherUser;

    private String otherUserImage;

    @Builder
    public MatchingRoomInfo(Long id, String name, User user, String userImage, User otherUser, String otherUserImage) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.userImage = userImage;
        this.otherUser = otherUser;
        this.otherUserImage = otherUserImage;
    }
}
