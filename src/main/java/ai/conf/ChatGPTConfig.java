//package ai.conf;
//
//import java.time.Duration;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import com.theokanning.openai.service.OpenAiService;
//
//@Configuration
//public class ChatGPTConfig {
//	@Value("${openai.key}")
//    private String apiKey;
//	 
//	@Bean
//    public OpenAiService getOpenAiService() {
//		return new OpenAiService(apiKey, Duration.ofSeconds(30));
//    }
//
//}
