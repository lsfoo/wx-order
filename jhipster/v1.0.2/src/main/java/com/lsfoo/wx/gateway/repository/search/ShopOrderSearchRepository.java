package com.lsfoo.wx.gateway.repository.search;

import com.lsfoo.wx.gateway.domain.ShopOrder;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ShopOrder entity.
 */
public interface ShopOrderSearchRepository extends ElasticsearchRepository<ShopOrder, Long> {
}
