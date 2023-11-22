package application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = { "application", "user.*", "product.*", "matching.*", "community.*", "order.*",
		"payment.*", "admin.*", "s3.*" })
@EntityScan({ "user.bean", "product.bean", "matching.bean", "community.bean", "order.bean", "payment.bean" })
@EnableJpaRepositories({ "user.repository", "product.repository", "matching.repository", "community.repository",
		"order.repository", "payment.repository", "admin.repository" })
public class FlirdogApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlirdogApplication.class, args);
	}

}
