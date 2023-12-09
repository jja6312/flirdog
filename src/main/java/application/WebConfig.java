package application;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
	 @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")
	                .allowedOrigins("http://localhost:3000") // 프론트엔드 서버의 주소
	                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
	                .allowedHeaders("*")
	                .allowCredentials(true);
	    }

}
