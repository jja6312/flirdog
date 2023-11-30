package somoim.bean;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class SomoimListSerializer extends JsonSerializer<SomoimList> {
    @Override
    public void serialize(SomoimList somoimList, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeObjectField("id", somoimList.getId());
        gen.writeObjectField("somoim", somoimList.getSomoim());
        gen.writeObjectField("user", somoimList.getUser());
        gen.writeBooleanField("isAdmin", somoimList.isAdmin());
        // 여기에 다른 필드에 대한 처리 추가
        gen.writeEndObject();
    }
}