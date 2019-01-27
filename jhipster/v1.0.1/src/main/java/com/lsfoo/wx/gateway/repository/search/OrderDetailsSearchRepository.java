package com.lsfoo.wx.gateway.repository.search;

import com.lsfoo.wx.gateway.domain.OrderDetails;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the OrderDetails entity.
 */
public interface OrderDetailsSearchRepository extends ElasticsearchRepository<OrderDetails, Long> {
}
