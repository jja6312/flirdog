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
        gen.writeStringField("userRole", user.getUserRole().name());
        gen.writeNumberField("point", user.getPoint());
        gen.writeNumberField("communityScore", user.getCommunityScore());
        // Add serialization for other fields as needed
        gen.writeEndObject();
    }
}