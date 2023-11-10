package application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
<<<<<<< HEAD
@ComponentScan(basePackages={"application", "user.*", "product.*", "matching.*", "community.*"})
@EntityScan({"user.bean", "product.bean", "matching.bean", "community.bean"})
@EnableJpaRepositories({"user.repository", "product.repository", "matching.repository", "community.repository"})
=======
@ComponentScan(basePackages={"application", "user.*", "product.*"})
@EntityScan({"user.bean", "product.bean"})
@EnableJpaRepositories({"user.dao", "product.dao"})
>>>>>>> f63edee (스프링 기본 세팅)
public class FlirdogApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlirdogApplication.class, args);
	}

}
