package somoim.bean;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class SomoimSerializer extends JsonSerializer<Somoim> {
    @Override
    public void serialize(Somoim somoim, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeObjectField("id", somoim.getId());
        gen.writeStringField("somoimName", somoim.getSomoimName());
        gen.writeStringField("introduceSub", somoim.getIntroduceSub());
        gen.writeStringField("introduceDetail", somoim.getIntroduceDetail());
        gen.writeStringField("introducePhoto", somoim.getIntroducePhoto());
        gen.writeStringField("introducePhotoUUID", somoim.getIntroducePhotoUUID());
        gen.writeNumberField("memberCount", somoim.getMemberCount());
        gen.writeStringField("location", somoim.getLocation().name());
        gen.writeStringField("target", somoim.getTarget());
        gen.writeStringField("address", somoim.getAddress());
        gen.writeStringField("address2", somoim.getAddress2());
        // user 필드는 생략 (id만 직렬화)
        gen.writeObjectField("userId", somoim.getUser() != null ? somoim.getUser().getId() : null);
        gen.writeStringField("accountEmail", somoim.getAccountEmail());
        gen.writeNumberField("accountPhone", somoim.getAccountPhone());
        gen.writeEndObject();
    }
}
