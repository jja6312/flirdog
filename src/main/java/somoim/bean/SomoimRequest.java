package somoim.bean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import user.bean.User;

@Getter
@Setter
@NoArgsConstructor
public class SomoimRequest {
	
	private Somoim somoim;
    private User user;
}
