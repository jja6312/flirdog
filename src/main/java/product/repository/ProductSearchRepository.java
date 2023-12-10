package product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import product.bean.Product;
import product.bean.SubCategory;

import java.util.List;

@Repository
public interface ProductSearchRepository extends JpaRepository<Product, Long> {
    List<Product> findByName(String name);
    List<Product> findBySubCategory(SubCategory subCategory);
}
