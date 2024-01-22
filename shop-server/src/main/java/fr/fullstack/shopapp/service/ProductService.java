package fr.fullstack.shopapp.service;

import fr.fullstack.shopapp.model.LocalizedProduct;
import fr.fullstack.shopapp.model.Product;
import fr.fullstack.shopapp.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {
    @PersistenceContext
    private EntityManager em;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Product createProduct(Product product) throws Exception {
        // Check that product exists at least in french and check name's length
        try {
            checkLocalizedProducts(product);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

        try {
            Product newProduct = productRepository.save(product);
            em.flush();
            em.refresh(newProduct);
            return newProduct;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public void deleteProductById(long id) throws Exception {
        try {
            getProduct(id);
            productRepository.deleteById(id);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public Product getProductById(long id) throws Exception {
        try {
            return getProduct(id);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public Page<Product> getShopProductList(Optional<String> name, Optional<Long> shopId, Optional<Long> categoryId,
            Pageable pageable) {
        Map<Boolean, Page<Product>> conditions = new HashMap<>();
        conditions.put(shopId.isPresent() && categoryId.isPresent(),
                productRepository.findByShopAndCategory(shopId.get(), categoryId.get(), pageable));
        conditions.put(shopId.isPresent(),
                productRepository.findByShop(shopId.get(), pageable));
        conditions.put(name.isPresent(),
                productRepository.findByLocalizedProductName(name.get(), pageable));
        return conditions.entrySet().stream()
                .filter(Map.Entry::getKey)
                .findFirst()
                .map(Map.Entry::getValue)
                .orElse(productRepository.findByOrderByIdAsc(pageable));
    }

    public Page<Product> getShopProductListBySorts(Optional<Long> shopId, Optional<Long> categoryId,
            Pageable pageable) {
        if (shopId.isPresent() && categoryId.isPresent()) {
            return productRepository.findByShopAndCategory(shopId.get(), categoryId.get(), pageable);
        }

        if (shopId.isPresent()) {
            return productRepository.findByShop(shopId.get(), pageable);
        }

        return productRepository.findByOrderByIdAsc(pageable);
    }

    @Transactional
    public Product updateProduct(Product product) throws Exception {
        try {
            getProduct(product.getId());
            return this.createProduct(product);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    private void checkLocalizedProducts(Product product) throws Exception {
        Optional<LocalizedProduct> localizedProductFr = product.getLocalizedProducts()
                .stream().filter(o -> o.getLocale().equals("FR")).findFirst();

        // A name in french must be at least provided
        if (!localizedProductFr.isPresent()) {
            throw new Exception("A name in french must be at least provided");
        }
    }

    private Product getProduct(Long id) throws Exception {
        Optional<Product> product = productRepository.findById(id);
        if (!product.isPresent()) {
            throw new Exception("Product with id " + id + " not found");
        }
        return product.get();
    }

}
