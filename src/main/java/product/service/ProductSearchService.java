package product.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import product.bean.Product;
import product.bean.SubCategory;
import product.repository.ProductSearchRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional(readOnly = true)
public class ProductSearchService {
    @Autowired
    private ProductSearchRepository productSearchRepository;

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
        List<Product> result = new ArrayList<>();
        for (SubCategory subCategory : subCategories) {
            result.addAll(productSearchRepository.findBySubCategory(subCategory));
        }
        return result;
    }

    public Optional<Product> getProductById(Long id) {
        return productSearchRepository.findById(id);
    }
}