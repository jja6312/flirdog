package message.bean;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;



@Document(collection = "message")
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int roomNo;

    private Integer userId;

    private String nickName;

    private int messageType;

    private String content;

    private String  sendDate;

    @Builder(toBuilder = true)
    private Message(int roomNo, Integer userId, String nickName, int messageType, String content, String sendDate) {
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

    public Message setSendDateToCurrentTime() {
        return this.toBuilder()
                .sendDate(LocalDateTime.now().toString())
                .build();
    }
}