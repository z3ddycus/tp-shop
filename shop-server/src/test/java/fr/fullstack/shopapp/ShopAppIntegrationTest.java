package fr.fullstack.shopapp;

import fr.fullstack.shopapp.ShopAppApplication;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = { ShopAppApplication.class })
@WebAppConfiguration
public class ShopAppIntegrationTest {

    @Test
    public void shouldStartContext() {

    }

}