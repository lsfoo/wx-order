package com.lsfoo.wx.gateway.web.rest;

import com.lsfoo.wx.gateway.GatewayApp;

import com.lsfoo.wx.gateway.domain.Specs;
import com.lsfoo.wx.gateway.repository.SpecsRepository;
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
 * Test class for the SpecsResource REST controller.
 *
 * @see SpecsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class SpecsResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final Integer DEFAULT_STOCK = 1;
    private static final Integer UPDATED_STOCK = 2;

    @Autowired
    private SpecsRepository specsRepository;

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

    private MockMvc restSpecsMockMvc;

    private Specs specs;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SpecsResource specsResource = new SpecsResource(specsRepository);
        this.restSpecsMockMvc = MockMvcBuilders.standaloneSetup(specsResource)
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
    public static Specs createEntity(EntityManager em) {
        Specs specs = new Specs()
            .name(DEFAULT_NAME)
            .price(DEFAULT_PRICE)
            .stock(DEFAULT_STOCK);
        return specs;
    }

    @Before
    public void initTest() {
        specs = createEntity(em);
    }

    @Test
    @Transactional
    public void createSpecs() throws Exception {
        int databaseSizeBeforeCreate = specsRepository.findAll().size();

        // Create the Specs
        restSpecsMockMvc.perform(post("/api/specs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(specs)))
            .andExpect(status().isCreated());

        // Validate the Specs in the database
        List<Specs> specsList = specsRepository.findAll();
        assertThat(specsList).hasSize(databaseSizeBeforeCreate + 1);
        Specs testSpecs = specsList.get(specsList.size() - 1);
        assertThat(testSpecs.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSpecs.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testSpecs.getStock()).isEqualTo(DEFAULT_STOCK);
    }

    @Test
    @Transactional
    public void createSpecsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = specsRepository.findAll().size();

        // Create the Specs with an existing ID
        specs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSpecsMockMvc.perform(post("/api/specs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(specs)))
            .andExpect(status().isBadRequest());

        // Validate the Specs in the database
        List<Specs> specsList = specsRepository.findAll();
        assertThat(specsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSpecs() throws Exception {
        // Initialize the database
        specsRepository.saveAndFlush(specs);

        // Get all the specsList
        restSpecsMockMvc.perform(get("/api/specs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(specs.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].stock").value(hasItem(DEFAULT_STOCK)));
    }
    
    @Test
    @Transactional
    public void getSpecs() throws Exception {
        // Initialize the database
        specsRepository.saveAndFlush(specs);

        // Get the specs
        restSpecsMockMvc.perform(get("/api/specs/{id}", specs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(specs.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.stock").value(DEFAULT_STOCK));
    }

    @Test
    @Transactional
    public void getNonExistingSpecs() throws Exception {
        // Get the specs
        restSpecsMockMvc.perform(get("/api/specs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSpecs() throws Exception {
        // Initialize the database
        specsRepository.saveAndFlush(specs);

        int databaseSizeBeforeUpdate = specsRepository.findAll().size();

        // Update the specs
        Specs updatedSpecs = specsRepository.findById(specs.getId()).get();
        // Disconnect from session so that the updates on updatedSpecs are not directly saved in db
        em.detach(updatedSpecs);
        updatedSpecs
            .name(UPDATED_NAME)
            .price(UPDATED_PRICE)
            .stock(UPDATED_STOCK);

        restSpecsMockMvc.perform(put("/api/specs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSpecs)))
            .andExpect(status().isOk());

        // Validate the Specs in the database
        List<Specs> specsList = specsRepository.findAll();
        assertThat(specsList).hasSize(databaseSizeBeforeUpdate);
        Specs testSpecs = specsList.get(specsList.size() - 1);
        assertThat(testSpecs.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSpecs.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testSpecs.getStock()).isEqualTo(UPDATED_STOCK);
    }

    @Test
    @Transactional
    public void updateNonExistingSpecs() throws Exception {
        int databaseSizeBeforeUpdate = specsRepository.findAll().size();

        // Create the Specs

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSpecsMockMvc.perform(put("/api/specs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(specs)))
            .andExpect(status().isBadRequest());

        // Validate the Specs in the database
        List<Specs> specsList = specsRepository.findAll();
        assertThat(specsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSpecs() throws Exception {
        // Initialize the database
        specsRepository.saveAndFlush(specs);

        int databaseSizeBeforeDelete = specsRepository.findAll().size();

        // Get the specs
        restSpecsMockMvc.perform(delete("/api/specs/{id}", specs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Specs> specsList = specsRepository.findAll();
        assertThat(specsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Specs.class);
        Specs specs1 = new Specs();
        specs1.setId(1L);
        Specs specs2 = new Specs();
        specs2.setId(specs1.getId());
        assertThat(specs1).isEqualTo(specs2);
        specs2.setId(2L);
        assertThat(specs1).isNotEqualTo(specs2);
        specs1.setId(null);
        assertThat(specs1).isNotEqualTo(specs2);
    }
}
