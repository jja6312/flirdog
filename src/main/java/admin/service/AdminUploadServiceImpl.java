package admin.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import product.bean.Product;

@Service
@Transactional
public class AdminUploadServiceImpl implements AdminUploadService {
	// @Autowired
	// private ProductRepository productRepository;

	@Override
	public void upload(List<Product> userImageList) {
		// productRepository.saveAll(userImageList);

	}

}
