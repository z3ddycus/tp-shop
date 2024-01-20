package fr.fullstack.shopapp.model;

import fr.fullstack.shopapp.ShopAppApplication;

import static org.junit.jupiter.api.Assertions.assertTrue;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.context.WebApplicationContext;

// https://www.concretepage.com/spring-5/webappconfiguration-example-spring-test

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = { ShopAppApplication.class })
@WebAppConfiguration
public class ProductControllerIntegrationTest {

	@Autowired
	protected WebApplicationContext webAppContext;

	private MockMvc mockMvc;

	@BeforeEach
	public void setup() {
		mockMvc = webAppContextSetup(webAppContext).build();
	}

	@Test
	public void webAppContextTest() throws Exception {
		assertTrue(webAppContext.getServletContext() instanceof MockServletContext);
	}

	@Test
	public void shouldStartContext() {

	}

	@Test
	public void testGetProductsOfShopWithSearchName() throws Exception {
		long shopId = 1L;
		String name = "Product-1";
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/shops")
				.param("shopId", String.valueOf(shopId))
				.param("name", name))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$.content").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.content[0].name").value(name));
	}
}