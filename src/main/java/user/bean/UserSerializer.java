package user.bean;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class UserSerializer extends JsonSerializer<User> {
    @Override
    public void serialize(User user, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeObjectField("id", user.getId());
        gen.writeStringField("name", user.getName());
        gen.writeStringField("passwd", user.getPasswd());
        gen.writeStringField("email", user.getEmail());
        gen.writeStringField("nickname", user.getNickname());
        // gen.writeStringField("userRole", user.getUserRole().name());
        // Null 체크를 추가하고 기본값을 "USER"로 설정 - 12/9지안. 카카오로그인떄매
        UserRole userRole = user.getUserRole();
        if (userRole != null) {
            gen.writeStringField("userRole", userRole.name());
        } else {
            gen.writeStringField("userRole", UserRole.USER.name()); // 기본값 "USER" 설정
        }
        gen.writeNumberField("point", user.getPoint());
        gen.writeNumberField("communityScore", user.getCommunityScore());
        // Add serialization for other fields as needed
        gen.writeEndObject();

    }
}