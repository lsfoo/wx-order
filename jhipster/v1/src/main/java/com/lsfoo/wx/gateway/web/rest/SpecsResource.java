package com.lsfoo.wx.gateway.web.rest;
import com.lsfoo.wx.gateway.domain.Specs;
import com.lsfoo.wx.gateway.repository.SpecsRepository;
import com.lsfoo.wx.gateway.repository.search.SpecsSearchRepository;
import com.lsfoo.wx.gateway.web.rest.errors.BadRequestAlertException;
import com.lsfoo.wx.gateway.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Specs.
 */
@RestController
@RequestMapping("/api")
public class SpecsResource {

    private final Logger log = LoggerFactory.getLogger(SpecsResource.class);

    private static final String ENTITY_NAME = "specs";

    private final SpecsRepository specsRepository;

    private final SpecsSearchRepository specsSearchRepository;

    public SpecsResource(SpecsRepository specsRepository, SpecsSearchRepository specsSearchRepository) {
        this.specsRepository = specsRepository;
        this.specsSearchRepository = specsSearchRepository;
    }

    /**
     * POST  /specs : Create a new specs.
     *
     * @param specs the specs to create
     * @return the ResponseEntity with status 201 (Created) and with body the new specs, or with status 400 (Bad Request) if the specs has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/specs")
    public ResponseEntity<Specs> createSpecs(@RequestBody Specs specs) throws URISyntaxException {
        log.debug("REST request to save Specs : {}", specs);
        if (specs.getId() != null) {
            throw new BadRequestAlertException("A new specs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Specs result = specsRepository.save(specs);
        specsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/specs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /specs : Updates an existing specs.
     *
     * @param specs the specs to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated specs,
     * or with status 400 (Bad Request) if the specs is not valid,
     * or with status 500 (Internal Server Error) if the specs couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/specs")
    public ResponseEntity<Specs> updateSpecs(@RequestBody Specs specs) throws URISyntaxException {
        log.debug("REST request to update Specs : {}", specs);
        if (specs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Specs result = specsRepository.save(specs);
        specsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, specs.getId().toString()))
            .body(result);
    }

    /**
     * GET  /specs : get all the specs.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of specs in body
     */
    @GetMapping("/specs")
    public List<Specs> getAllSpecs(@RequestParam(required = false) String filter) {
        if ("orderdetails-is-null".equals(filter)) {
            log.debug("REST request to get all Specss where orderDetails is null");
            return StreamSupport
                .stream(specsRepository.findAll().spliterator(), false)
                .filter(specs -> specs.getOrderDetails() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Specs");
        return specsRepository.findAll();
    }

    /**
     * GET  /specs/:id : get the "id" specs.
     *
     * @param id the id of the specs to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the specs, or with status 404 (Not Found)
     */
    @GetMapping("/specs/{id}")
    public ResponseEntity<Specs> getSpecs(@PathVariable Long id) {
        log.debug("REST request to get Specs : {}", id);
        Optional<Specs> specs = specsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(specs);
    }

    /**
     * DELETE  /specs/:id : delete the "id" specs.
     *
     * @param id the id of the specs to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/specs/{id}")
    public ResponseEntity<Void> deleteSpecs(@PathVariable Long id) {
        log.debug("REST request to delete Specs : {}", id);
        specsRepository.deleteById(id);
        specsSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/specs?query=:query : search for the specs corresponding
     * to the query.
     *
     * @param query the query of the specs search
     * @return the result of the search
     */
    @GetMapping("/_search/specs")
    public List<Specs> searchSpecs(@RequestParam String query) {
        log.debug("REST request to search Specs for query {}", query);
        return StreamSupport
            .stream(specsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
