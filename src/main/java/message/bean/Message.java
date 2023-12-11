package message.bean;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "message")
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class Message {

    @Id
    private String id;

    private Long messageRoomId;
    private Long userId;
    private String nickName;
    private int messageType;
    private String content;

    private String sendDate;

    private String profileImage;

    @Builder(toBuilder = true)
    private Message(Long messageRoomId, Long userId, String nickName, int messageType, String content, String  sendDate, String profileImage) {
        this.messageRoomId = messageRoomId;
        this.userId = userId;
        this.nickName = nickName;
        this.messageType = messageType;
        this.content = content;
        this.sendDate = sendDate;
        this.profileImage = profileImage;
    }
}
