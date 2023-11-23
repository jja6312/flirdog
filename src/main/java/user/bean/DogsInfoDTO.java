package user.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "userTable")
public class DogsInfoDTO {
	
	   	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

		@NonNull
		@Column(name="name", length=50)
	    private String name;

		@NonNull
		@Column(name="age", length=50)
	    private String age;

		@NonNull
		@Column(name="gender", length=50)
	    private String gender;

		@NonNull
		@Column(name="dogsBreed", length=50)
	    private DogsBreed dogsBreed; //품종

		@Column(name="isNeutralized", length=50)
	    private Boolean isNeutralized; //중성화 여부 했으면 true 안했으면 false

		@Column(name="image", length=50)
	    private String image;

		@Column(name="score", length=50)
	    private String score;

		@NonNull
		@Column(name="dogsInfo", length=50)
	    private String dogsInfo;
}
