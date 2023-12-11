package admin.conf;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import product.bean.Hit;

public class HitSerializer extends JsonSerializer<Hit> {
	 @Override
	    public void serialize(Hit value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
	        gen.writeNumber(value.getHit());
	    }

}
