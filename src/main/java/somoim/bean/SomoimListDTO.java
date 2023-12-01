package somoim.bean;

public class SomoimListDTO {

    private Long id;
    private Long somoimId;
    private Long userId;
    private boolean isAdmin;

    // 생성자, Getter, Setter 등 필요한 메서드 추가

    public SomoimListDTO(Long id, Long somoimId, Long userId, boolean isAdmin) {
        this.id = id;
        this.somoimId = somoimId;
        this.userId = userId;
        this.isAdmin = isAdmin;
    }
}

