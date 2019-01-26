package com.lsfoo.wx.gateway.repository;

import com.lsfoo.wx.gateway.domain.ShopOrder;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ShopOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShopOrderRepository extends JpaRepository<ShopOrder, Long> {

}
