package message.bean;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class SendMessageForm {

    private Long messageRoomId;

    private Long userId;

    private String nickName;

    private int messageType;

    private String content;

    private String  sendDate;

    private String profileImage;

    @Builder(toBuilder = true)
    private SendMessageForm(Long messageRoomId, Long userId, String nickName, int messageType, String content, String sendDate, String profileImage) {
        this.messageRoomId = messageRoomId;
        this.userId = userId;
        this.nickName = nickName;
        this.messageType = messageType;
        this.content = content;
        this.sendDate = sendDate;
        this.profileImage = profileImage;
    }

    public SendMessageForm setSendDateToCurrentTime() {
        return this.toBuilder()
                .sendDate(LocalDateTime.now().toString())
                .build();
    }
}