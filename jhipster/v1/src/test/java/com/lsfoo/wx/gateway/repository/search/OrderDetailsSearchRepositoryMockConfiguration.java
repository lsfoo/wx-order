package com.lsfoo.wx.gateway.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of OrderDetailsSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class OrderDetailsSearchRepositoryMockConfiguration {

    @MockBean
    private OrderDetailsSearchRepository mockOrderDetailsSearchRepository;

}
