package admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import product.bean.Product;

public interface AdminProductRepository extends JpaRepository<Product, Long> {

}
