package com.lsfoo.wx.gateway.web.rest;

import com.lsfoo.wx.gateway.GatewayApp;

import com.lsfoo.wx.gateway.domain.ShopOrder;
import com.lsfoo.wx.gateway.repository.ShopOrderRepository;
import com.lsfoo.wx.gateway.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.lsfoo.wx.gateway.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ShopOrderResource REST controller.
 *
 * @see ShopOrderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class ShopOrderResourceIntTest {

    private static final String DEFAULT_ORDER_NO = "AAAAAAAAAA";
    private static final String UPDATED_ORDER_NO = "BBBBBBBBBB";

    private static final Double DEFAULT_TOTAL_MONEY = 1D;
    private static final Double UPDATED_TOTAL_MONEY = 2D;

    @Autowired
    private ShopOrderRepository shopOrderRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restShopOrderMockMvc;

    private ShopOrder shopOrder;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ShopOrderResource shopOrderResource = new ShopOrderResource(shopOrderRepository);
        this.restShopOrderMockMvc = MockMvcBuilders.standaloneSetup(shopOrderResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ShopOrder createEntity(EntityManager em) {
        ShopOrder shopOrder = new ShopOrder()
            .orderNo(DEFAULT_ORDER_NO)
            .totalMoney(DEFAULT_TOTAL_MONEY);
        return shopOrder;
    }

    @Before
    public void initTest() {
        shopOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createShopOrder() throws Exception {
        int databaseSizeBeforeCreate = shopOrderRepository.findAll().size();

        // Create the ShopOrder
        restShopOrderMockMvc.perform(post("/api/shop-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shopOrder)))
            .andExpect(status().isCreated());

        // Validate the ShopOrder in the database
        List<ShopOrder> shopOrderList = shopOrderRepository.findAll();
        assertThat(shopOrderList).hasSize(databaseSizeBeforeCreate + 1);
        ShopOrder testShopOrder = shopOrderList.get(shopOrderList.size() - 1);
        assertThat(testShopOrder.getOrderNo()).isEqualTo(DEFAULT_ORDER_NO);
        assertThat(testShopOrder.getTotalMoney()).isEqualTo(DEFAULT_TOTAL_MONEY);
    }

    @Test
    @Transactional
    public void createShopOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shopOrderRepository.findAll().size();

        // Create the ShopOrder with an existing ID
        shopOrder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShopOrderMockMvc.perform(post("/api/shop-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shopOrder)))
            .andExpect(status().isBadRequest());

        // Validate the ShopOrder in the database
        List<ShopOrder> shopOrderList = shopOrderRepository.findAll();
        assertThat(shopOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllShopOrders() throws Exception {
        // Initialize the database
        shopOrderRepository.saveAndFlush(shopOrder);

        // Get all the shopOrderList
        restShopOrderMockMvc.perform(get("/api/shop-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shopOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].orderNo").value(hasItem(DEFAULT_ORDER_NO.toString())))
            .andExpect(jsonPath("$.[*].totalMoney").value(hasItem(DEFAULT_TOTAL_MONEY.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getShopOrder() throws Exception {
        // Initialize the database
        shopOrderRepository.saveAndFlush(shopOrder);

        // Get the shopOrder
        restShopOrderMockMvc.perform(get("/api/shop-orders/{id}", shopOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(shopOrder.getId().intValue()))
            .andExpect(jsonPath("$.orderNo").value(DEFAULT_ORDER_NO.toString()))
            .andExpect(jsonPath("$.totalMoney").value(DEFAULT_TOTAL_MONEY.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingShopOrder() throws Exception {
        // Get the shopOrder
        restShopOrderMockMvc.perform(get("/api/shop-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShopOrder() throws Exception {
        // Initialize the database
        shopOrderRepository.saveAndFlush(shopOrder);

        int databaseSizeBeforeUpdate = shopOrderRepository.findAll().size();

        // Update the shopOrder
        ShopOrder updatedShopOrder = shopOrderRepository.findById(shopOrder.getId()).get();
        // Disconnect from session so that the updates on updatedShopOrder are not directly saved in db
        em.detach(updatedShopOrder);
        updatedShopOrder
            .orderNo(UPDATED_ORDER_NO)
            .totalMoney(UPDATED_TOTAL_MONEY);

        restShopOrderMockMvc.perform(put("/api/shop-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedShopOrder)))
            .andExpect(status().isOk());

        // Validate the ShopOrder in the database
        List<ShopOrder> shopOrderList = shopOrderRepository.findAll();
        assertThat(shopOrderList).hasSize(databaseSizeBeforeUpdate);
        ShopOrder testShopOrder = shopOrderList.get(shopOrderList.size() - 1);
        assertThat(testShopOrder.getOrderNo()).isEqualTo(UPDATED_ORDER_NO);
        assertThat(testShopOrder.getTotalMoney()).isEqualTo(UPDATED_TOTAL_MONEY);
    }

    @Test
    @Transactional
    public void updateNonExistingShopOrder() throws Exception {
        int databaseSizeBeforeUpdate = shopOrderRepository.findAll().size();

        // Create the ShopOrder

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShopOrderMockMvc.perform(put("/api/shop-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shopOrder)))
            .andExpect(status().isBadRequest());

        // Validate the ShopOrder in the database
        List<ShopOrder> shopOrderList = shopOrderRepository.findAll();
        assertThat(shopOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteShopOrder() throws Exception {
        // Initialize the database
        shopOrderRepository.saveAndFlush(shopOrder);

        int databaseSizeBeforeDelete = shopOrderRepository.findAll().size();

        // Get the shopOrder
        restShopOrderMockMvc.perform(delete("/api/shop-orders/{id}", shopOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ShopOrder> shopOrderList = shopOrderRepository.findAll();
        assertThat(shopOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShopOrder.class);
        ShopOrder shopOrder1 = new ShopOrder();
        shopOrder1.setId(1L);
        ShopOrder shopOrder2 = new ShopOrder();
        shopOrder2.setId(shopOrder1.getId());
        assertThat(shopOrder1).isEqualTo(shopOrder2);
        shopOrder2.setId(2L);
        assertThat(shopOrder1).isNotEqualTo(shopOrder2);
        shopOrder1.setId(null);
        assertThat(shopOrder1).isNotEqualTo(shopOrder2);
    }
}
