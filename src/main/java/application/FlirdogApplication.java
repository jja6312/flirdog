package application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@ComponentScan(basePackages = { "application", "user.*", "product.*", "matching.*", "community.*", "order.*",
		"payment.*", "admin.*", "s3.*", "ai.*", "somoim.*", "mypage.*", "access.*", "message.*", "webmvc" })
@EntityScan({ "user.bean", "product.bean", "matching.bean", "community.bean", "order.bean", "payment.bean", "ai.bean",
		"somoim.bean", "access.bean" ,"mypage.bean", "message.bean"})
@EnableJpaRepositories({ "user.repository", "product.repository", "matching.repository", "community.repository",
		"order.repository", "payment.repository", "admin.repository", "mypage.repository", "somoim.repository", 
		"access.repository", "message.repository" })
@EnableJpaAuditing
@EnableMongoRepositories({ "message.mongorepository"})
public class FlirdogApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlirdogApplication.class, args);
	}

}
