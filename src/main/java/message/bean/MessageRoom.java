package message.bean;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class MessageRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "messageRoom", cascade = CascadeType.ALL)
    private List<JoinUser> joinUsers;

    @Builder(toBuilder = true)
    public MessageRoom(String name){
        this.name = name;
    }
}