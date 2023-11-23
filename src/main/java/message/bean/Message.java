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

    private Integer senderNo;

    private String senderName;

    private int messageType;

    private String content;

    private String  sendDate;

    @Builder(toBuilder = true)
    private Message(int roomNo, Integer senderNo, String senderName, int messageType, String content, String sendDate) {
        this.roomNo = roomNo;
        this.senderNo = senderNo;
        this.senderName = senderName;
        this.messageType = messageType;
        this.content = content;
        this.sendDate = sendDate;
    }


    @Override
    public String toString() {
        return "{" +
                "roomNo='" + roomNo + '\'' +
                ", senderNo='" + senderNo + '\'' +
                ", senderName='" + senderName + '\'' +
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