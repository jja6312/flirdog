package user.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "dogsInfoTable")
@Data
public class DogsInfoDTO {
	

		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	   	@Column(name="id")
	    private Long id;

		//@NonNull 업로드 때문에 뺐음.
		@Column(name="name", length=50)
	    private String name;

		//@NonNull 업로드 때문에 뺐음.
		@Column(name="age", length=50)
	    private String age;

		//@NonNull 업로드 때문에 뺐음.
		@Column(name="gender", length=50)
	    private String gender;

		//@NonNull 업로드 때문에 뺐음.
		@Column(name="dogsBreed", length=50)
	    private String dogsBreed; //품종

		@Column(name="isNeutralized", length=50)
	    private Boolean isNeutralized; //중성화 여부 했으면 true 안했으면 false

		@Column(name="image", nullable = false, length = 100)
	    private String image; //이미지의 원래 이름
		
		@Column(name="imagefilename", nullable = false, length = 100)
		private String imageFileName; //UUID에서 얻은 이름
		
		@Column(name="score", length=50)
	    private String score;

		//@NonNull 업로드 때문에 뺐음.
		@Column(name="dogsInfo", length=50)
	    private String dogsInfo;

		@Column(name="dogsWeight", length=50)
	    private String dogsWeight;
		

		@Column(name="email", length=50)
	    private String email;
}
