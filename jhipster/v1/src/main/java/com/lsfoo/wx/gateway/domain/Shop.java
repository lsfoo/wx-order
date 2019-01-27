package com.lsfoo.wx.gateway.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * The Entity entity.
 * @author A true hipster
 */
@ApiModel(description = "The Entity entity. @author A true hipster")
@Entity
@Table(name = "shop")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "shop")
public class Shop implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * fieldName
     */
    @ApiModelProperty(value = "fieldName")
    @Column(name = "name")
    private String name;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "shop")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();
    @OneToMany(mappedBy = "shop")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Category> categories = new HashSet<>();
    @OneToMany(mappedBy = "shop")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ShopOrder> shopOrders = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Shop name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public Shop user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Shop products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Shop addProduct(Product product) {
        this.products.add(product);
        product.setShop(this);
        return this;
    }

    public Shop removeProduct(Product product) {
        this.products.remove(product);
        product.setShop(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public Shop categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public Shop addCategory(Category category) {
        this.categories.add(category);
        category.setShop(this);
        return this;
    }

    public Shop removeCategory(Category category) {
        this.categories.remove(category);
        category.setShop(null);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Set<ShopOrder> getShopOrders() {
        return shopOrders;
    }

    public Shop shopOrders(Set<ShopOrder> shopOrders) {
        this.shopOrders = shopOrders;
        return this;
    }

    public Shop addShopOrder(ShopOrder shopOrder) {
        this.shopOrders.add(shopOrder);
        shopOrder.setShop(this);
        return this;
    }

    public Shop removeShopOrder(ShopOrder shopOrder) {
        this.shopOrders.remove(shopOrder);
        shopOrder.setShop(null);
        return this;
    }

    public void setShopOrders(Set<ShopOrder> shopOrders) {
        this.shopOrders = shopOrders;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Shop shop = (Shop) o;
        if (shop.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shop.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Shop{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
