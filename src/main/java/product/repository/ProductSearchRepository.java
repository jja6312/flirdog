package product.repository;

import java.util.List;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import product.bean.Product;

public interface ProductSelectRepository extends ElasticsearchRepository<Product, String> {
    List<Product> findByName(String name);
}
