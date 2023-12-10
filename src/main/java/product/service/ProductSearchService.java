package product.service;

import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import product.bean.Product;
import product.bean.SubCategory;
import product.repository.ProductSearchRepository;

@Service
@Slf4j
public class ProductSearchService {

    private final ProductSearchRepository productSearchRepository;

    @Autowired
    public ProductSearchService(ProductSearchRepository productSearchRepository) {
        this.productSearchRepository = productSearchRepository;
    }

    public List<Product> searchProductsByName(String name) {
        return productSearchRepository.findByName(name);
    }

    public List<Product> getAllProducts() {
        return productSearchRepository.findAll();
    }

    public List<Product> getProductsBySubCategories(List<SubCategory> subCategories) {
        return productSearchRepository.findBySubCategories(subCategories);
    }

    public Optional<Product> getProductById(String id) {
        return productSearchRepository.findById(id);
    }
}