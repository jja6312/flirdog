package access.bean;

import lombok.Data;

@Data
public class KakaoUserInfo {
    private Long id; // 카카오 사용자 ID
    private String connected_at; // 연결 시간
    private KakaoAccount kakao_account; // 카카오 계정 정보

    @Data
    public static class KakaoAccount {
        private String email; // 이메일
        private Boolean has_email; // 이메일 존재 여부
        private Boolean email_needs_agreement; // 이메일 제공 동의 필요 여부
        private Boolean is_email_valid; // 이메일 유효 여부
        private Boolean is_email_verified; // 이메일 검증 여부
        private Profile profile; // 프로필 정보

        @Data
        public static class Profile {
            private String nickname; // 닉네임
            private String thumbnail_image_url; // 썸네일 이미지 URL
            private String profile_image_url; // 프로필 이미지 URL
        }
    }
}
