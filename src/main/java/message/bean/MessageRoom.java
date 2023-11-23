package message.bean;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import user.bean.Address;
import user.bean.User;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class MessageRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Enumerated
    private RoomType roomType;

    @OneToMany(mappedBy = "messageRoom", cascade = CascadeType.ALL)
    private List<JoinUser> joinUsers;
}
