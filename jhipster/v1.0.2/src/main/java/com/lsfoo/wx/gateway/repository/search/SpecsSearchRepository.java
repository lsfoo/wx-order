package com.lsfoo.wx.gateway.repository.search;

import com.lsfoo.wx.gateway.domain.Specs;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Specs entity.
 */
public interface SpecsSearchRepository extends ElasticsearchRepository<Specs, Long> {
}
