package com.lsfoo.wx.gateway.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lsfoo.wx.gateway.domain.ShopOrder;
import com.lsfoo.wx.gateway.repository.ShopOrderRepository;
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

/**
 * REST controller for managing ShopOrder.
 */
@RestController
@RequestMapping("/api")
public class ShopOrderResource {

    private final Logger log = LoggerFactory.getLogger(ShopOrderResource.class);

    private static final String ENTITY_NAME = "shopOrder";

    private final ShopOrderRepository shopOrderRepository;

    public ShopOrderResource(ShopOrderRepository shopOrderRepository) {
        this.shopOrderRepository = shopOrderRepository;
    }

    /**
     * POST  /shop-orders : Create a new shopOrder.
     *
     * @param shopOrder the shopOrder to create
     * @return the ResponseEntity with status 201 (Created) and with body the new shopOrder, or with status 400 (Bad Request) if the shopOrder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/shop-orders")
    @Timed
    public ResponseEntity<ShopOrder> createShopOrder(@RequestBody ShopOrder shopOrder) throws URISyntaxException {
        log.debug("REST request to save ShopOrder : {}", shopOrder);
        if (shopOrder.getId() != null) {
            throw new BadRequestAlertException("A new shopOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ShopOrder result = shopOrderRepository.save(shopOrder);
        return ResponseEntity.created(new URI("/api/shop-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /shop-orders : Updates an existing shopOrder.
     *
     * @param shopOrder the shopOrder to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated shopOrder,
     * or with status 400 (Bad Request) if the shopOrder is not valid,
     * or with status 500 (Internal Server Error) if the shopOrder couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/shop-orders")
    @Timed
    public ResponseEntity<ShopOrder> updateShopOrder(@RequestBody ShopOrder shopOrder) throws URISyntaxException {
        log.debug("REST request to update ShopOrder : {}", shopOrder);
        if (shopOrder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ShopOrder result = shopOrderRepository.save(shopOrder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, shopOrder.getId().toString()))
            .body(result);
    }

    /**
     * GET  /shop-orders : get all the shopOrders.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of shopOrders in body
     */
    @GetMapping("/shop-orders")
    @Timed
    public List<ShopOrder> getAllShopOrders() {
        log.debug("REST request to get all ShopOrders");
        return shopOrderRepository.findAll();
    }

    /**
     * GET  /shop-orders/:id : get the "id" shopOrder.
     *
     * @param id the id of the shopOrder to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shopOrder, or with status 404 (Not Found)
     */
    @GetMapping("/shop-orders/{id}")
    @Timed
    public ResponseEntity<ShopOrder> getShopOrder(@PathVariable Long id) {
        log.debug("REST request to get ShopOrder : {}", id);
        Optional<ShopOrder> shopOrder = shopOrderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(shopOrder);
    }

    /**
     * DELETE  /shop-orders/:id : delete the "id" shopOrder.
     *
     * @param id the id of the shopOrder to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/shop-orders/{id}")
    @Timed
    public ResponseEntity<Void> deleteShopOrder(@PathVariable Long id) {
        log.debug("REST request to delete ShopOrder : {}", id);

        shopOrderRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
