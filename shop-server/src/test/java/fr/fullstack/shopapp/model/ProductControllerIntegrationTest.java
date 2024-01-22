package fr.fullstack.shopapp.model;

import fr.fullstack.shopapp.ShopAppApplication;
import fr.fullstack.shopapp.repository.CategoryRepository;
import fr.fullstack.shopapp.repository.ProductRepository;
import fr.fullstack.shopapp.repository.ShopRepository;

import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.util.ArrayList;
import java.util.List;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

// https://www.concretepage.com/spring-5/webappconfiguration-example-spring-test

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = { ShopAppApplication.class })
@WebAppConfiguration
public class ProductControllerIntegrationTest {

    @Autowired
    protected WebApplicationContext webAppContext;

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    private List<Shop> shops;
    private List<Category> categories;
    private List<Product> products;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        mockMvc = webAppContextSetup(webAppContext).build();
        shops = new ArrayList<Shop>();
        categories = new ArrayList<Category>();
        products = new ArrayList<Product>();
        Shop shop = createTestShop();
        Category category = createTestCategory("Category-1");
        Product product = createTestProduct(shop.getId(), category, "Product-1");
        shops.add(shop);
        categories.add(category);
        products.add(product);
    }

    @AfterEach
    public void teardown() {
        for (Shop s : shops)
            shopRepository.delete(s);
        for (Category c : categories)
            categoryRepository.delete(c);
        for (Product p : products)
            productRepository.delete(p);
    }

    @Test
    @Transactional
    public void testGetProductsOfShopWithSearchName() throws Exception {
        Shop shop = shops.get(0);
        Category category = categories.get(0);
        Product product = products.get(0);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/products")
                .param("page", "0")
                .param("size", "10")
                .param("name", product.getLocalizedProducts().get(0).getName())
                .param("shopId", String.valueOf(shop.getId()))
                .param("categoryId", String.valueOf(category.getId())))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].localizedProducts[0].name")
                        .value(product.getLocalizedProducts().get(0).getName()))
                .andReturn();
        System.out.println("Response: " + result.getResponse().getContentAsString());
    }

    private Shop createTestShop() {
        Shop shop = new Shop();
        shop.setInVacations(false);
        shop.setName("Shop-1");
        shop.setOpeningHours(new ArrayList<>());
        shop.setNbCategories(1L);
        shop.setNbProducts(1L);
        shop.setInVacations(false);
        return shopRepository.save(shop);
    }

    private Category createTestCategory(String categoryName) {
        Category category = new Category();
        category.setName(categoryName);
        return categoryRepository.save(category);
    }

    private Product createTestProduct(long shopId, Category category, String name) {
        Product product = new Product();
        product.setShop(shopRepository.findById(shopId).orElseThrow());
        product.setPrice(10.0f);
        product.getCategories().add(category);
        LocalizedProduct localizedProduct = new LocalizedProduct();
        localizedProduct.setName(name);
        localizedProduct.setDescription("LocalizedProduct Description-1");
        localizedProduct.setLocale("FR");
        product.getLocalizedProducts().add(localizedProduct);
        return productRepository.save(product);
    }
}