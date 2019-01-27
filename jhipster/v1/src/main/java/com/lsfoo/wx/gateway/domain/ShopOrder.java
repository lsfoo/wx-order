package com.lsfoo.wx.gateway.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * The Entity entity.
 * @author A true hipster
 */
@ApiModel(description = "The Entity entity. @author A true hipster")
@Entity
@Table(name = "shop_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "shoporder")
public class ShopOrder implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * fieldName
     */
    @ApiModelProperty(value = "fieldName")
    @Column(name = "order_no")
    private String orderNo;

    @Column(name = "total_money")
    private Double totalMoney;

    @ManyToOne
    @JsonIgnoreProperties("shopOrders")
    private Shop shop;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public ShopOrder orderNo(String orderNo) {
        this.orderNo = orderNo;
        return this;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public Double getTotalMoney() {
        return totalMoney;
    }

    public ShopOrder totalMoney(Double totalMoney) {
        this.totalMoney = totalMoney;
        return this;
    }

    public void setTotalMoney(Double totalMoney) {
        this.totalMoney = totalMoney;
    }

    public Shop getShop() {
        return shop;
    }

    public ShopOrder shop(Shop shop) {
        this.shop = shop;
        return this;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
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
        ShopOrder shopOrder = (ShopOrder) o;
        if (shopOrder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shopOrder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ShopOrder{" +
            "id=" + getId() +
            ", orderNo='" + getOrderNo() + "'" +
            ", totalMoney=" + getTotalMoney() +
            "}";
    }
}
