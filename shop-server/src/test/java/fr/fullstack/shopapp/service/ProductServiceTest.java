package fr.fullstack.shopapp.service;

import fr.fullstack.shopapp.model.LocalizedProduct;
import fr.fullstack.shopapp.model.Product;
import fr.fullstack.shopapp.model.Shop;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.DisplayName.class)
@ActiveProfiles("test")
@TestPropertySource(properties = {"spring.profiles.active = test"})
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ProductServiceTest {

    @Autowired
    private ProductService productService;

    @Autowired
    private ShopService shopService;

    private Shop testShop;

    @BeforeAll
    @Transactional
    private void initTestData() throws Exception {
        // Init test shops
        this.testShop = this.shopService.createShop(new Shop());
    }

    @Test
    void createProductSuccessWithoutPromotionPrice() throws Exception {
        // Given
        var localizedProduct = new LocalizedProduct(0L, "Description", "FR", "Produit 1");
        var product = new Product(0L, List.of(), List.of(localizedProduct), 5, null, testShop);

        // When
        var createdProduct = this.productService.createProduct(product);

        // Then
        assertEquals("Produit 1", createdProduct.getLocalizedProducts().get(0).getName());
    }

    @Test
    void createProductSuccessWithPromotionPrice() throws Exception {
        // Given
        var localizedProduct = new LocalizedProduct(0L, "Description", "FR", "Produit 1");
        var product = new Product(0L, List.of(), List.of(localizedProduct), 5, 3f, testShop);

        // When
        var createdProduct = this.productService.createProduct(product);

        // Then
        assertEquals("Produit 1", createdProduct.getLocalizedProducts().get(0).getName());
    }

    @Test
    void createProductFailureOnPromotionPriceLessThan0() {
        // Given
        var localizedProduct = new LocalizedProduct(0L, "Description", "FR", "Produit 1");
        var product = new Product(0L, List.of(), List.of(localizedProduct), 5, -1f, testShop);
        var exceptionOccured = false;
        var exceptionMessage = "";

        // When
        try {
            this.productService.createProduct(product);
        } catch (Exception e) {
            exceptionOccured = true;
            exceptionMessage = e.getMessage();
        }

        // Then
        assertTrue(exceptionOccured);
        assertEquals("The promotion price must be greater than 0.", exceptionMessage);
    }

    @Test
    void createProductFailureOnPromotionPriceGreaterThanOriginalPrice() {
        // Given
        var localizedProduct = new LocalizedProduct(0L, "Description", "FR", "Produit 1");
        var product = new Product(0L, List.of(), List.of(localizedProduct), 5, 6f, testShop);
        var exceptionOccured = false;
        var exceptionMessage = "";

        // When
        try {
            this.productService.createProduct(product);
        } catch (Exception e) {
            exceptionOccured = true;
            exceptionMessage = e.getMessage();
        }

        // Then
        assertTrue(exceptionOccured);
        assertEquals("The promotion price must be less than the original price.", exceptionMessage);
    }

}