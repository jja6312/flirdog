package somoim.bean;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import api.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import user.bean.User;

@JsonSerialize(using = SomoimSerializer.class)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
//@ToString
public class Somoim extends BaseEntity{
	@Id
	@Column(name="somoim_Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@NonNull
	private String somoimName;
	
	@NonNull
	private String introduceSub;
	
	@NonNull
	@Column(length = 2000)
	private String introduceDetail;
	
	@NonNull
	private String introducePhoto;
	
	@NonNull
	private String introducePhotoUUID;
	
	
	@NonNull
	private Long memberCount;
	
	@Enumerated(EnumType.STRING)
	private Location location;
	
	@NonNull
	private String target;
	
	@NonNull // 22일추가
	private String address;
	
	@NonNull // 22일추가
	private String address2;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "created_id", nullable = false)
	@JsonIgnore
	private User user;
	
	@NonNull
	private String accountEmail;
	
	@NonNull
	private Long accountPhone;
	
	@OneToMany(mappedBy = "somoim", cascade = CascadeType.ALL)
	@JsonIgnore
    private List<SomoimList> somoimList;

	@Override
	public String toString() {
	    return "Somoim{" +
	            "id=" + id +
	            ", somoimName='" + somoimName + '\'' +
	            ", introduceSub='" + introduceSub + '\'' +
	            ", introduceDetail='" + introduceDetail + '\'' +
	            ", introducePhoto='" + introducePhoto + '\'' +
	            ", introducePhotoUUID='" + introducePhotoUUID + '\'' +
	            ", memberCount=" + memberCount +
	            ", location=" + location +
	            ", target='" + target + '\'' +
	            ", address='" + address + '\'' +
	            ", address2='" + address2 + '\'' +
	            ", user=" + (user != null ? user.getId() : null) + // 사용자 객체의 ID 출력
	            ", accountEmail='" + accountEmail + '\'' +
	            ", accountPhone=" + accountPhone +
	            '}';
	}
}
