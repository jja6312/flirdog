package message.bean;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class SendMessageForm {

    private int roomNo;

    private Integer userId;

    private String nickName;

    private int messageType;

    private String content;

    private String  sendDate;

    @Builder(toBuilder = true)
    private SendMessageForm(int roomNo, Integer userId, String nickName, int messageType, String content, String sendDate) {
        this.roomNo = roomNo;
        this.userId = userId;
        this.nickName = nickName;
        this.messageType = messageType;
        this.content = content;
        this.sendDate = sendDate;
    }


    @Override
    public String toString() {
        return "{" +
                "roomNo='" + roomNo + '\'' +
                ", userId='" + userId + '\'' +
                ", nickName='" + nickName + '\'' +
                ", messageType='" + messageType + '\'' +
                ", content='" + content + '\'' +
                ", sendDate='" + sendDate + '\'' +
                '}';
    }

    public SendMessageForm setSendDateToCurrentTime() {
        return this.toBuilder()
                .sendDate(LocalDateTime.now().toString())
                .build();
    }
}