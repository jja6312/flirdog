package product.service;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import message.bean.Message;
import message.mongorepository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import product.bean.Product;
import product.repository.ProductSearchRepository;

@Service
@Slf4j
public class ProductService {
    private final ProductSearchRepository productSearchRepository;
    @Autowired
    public ProductService(ProductSearchRepository productSearchRepository) {
        this.productSearchRepository = productSearchRepository;
    }

    public List<Product> searchProductsByName(String name) {
        return productSearchRepository.findByName(name);
    }
}