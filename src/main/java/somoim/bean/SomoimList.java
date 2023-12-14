package somoim.bean;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import api.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import user.bean.User;

@JsonSerialize(using = SomoimListSerializer.class)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
public class SomoimList extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "somoim_id", nullable = false)
    private Somoim somoim;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private int isAdmin;

    public SomoimList(Somoim somoim, User user, int isAdmin) {
        this.somoim = somoim;
        this.user = user;
        this.isAdmin = isAdmin;
    }
    
    @PrePersist
    public void beforePersist() {
        if (this.somoim != null && this.user != null) {

            // isAdmin 값을 설정하는 로직
        	if(this.user.getId().equals(this.somoim.getUser().getId())) {
        		this.isAdmin = 1; // 소모임 개설자
        	} else if (this.isAdmin != 1) {
        		this.isAdmin = 0; // 소모임 참가자
        	}

        }
    }
}