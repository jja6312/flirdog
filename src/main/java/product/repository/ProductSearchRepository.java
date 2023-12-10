package product.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import product.bean.Product;
import product.bean.SubCategory;

@Repository
public interface ProductSearchRepository extends ElasticsearchRepository<Product, String> {
    List<Product> findByName(String name);
    Optional<Product> findById(String id);

    List<Product> findAll();

    @Query("{\"bool\": {\"must\": [{\"terms\": {\"subCategory\": ?0}}]}}")
    List<Product> findBySubCategory(List<SubCategory> subCategories);
}
