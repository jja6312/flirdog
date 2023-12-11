package access.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import product.bean.Product;

public interface AccessProductRepository extends JpaRepository<Product,Long> {

	List<Product> findTop8ByOrderByHitDesc();

}
