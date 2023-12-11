package access.conf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import lombok.Getter;
import lombok.Setter;

@Configuration
@PropertySource("classpath:twilio.properties")
@Getter
@Setter
public class TwilioConfiguration {
	@Value("${twilio.account.sid}")
    private String twilioSid;
    @Value("${twilio.auth.token}")
    private String twilioToken;
    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;
}
