package com.lsfoo.wx.gateway.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of ShopOrderSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ShopOrderSearchRepositoryMockConfiguration {

    @MockBean
    private ShopOrderSearchRepository mockShopOrderSearchRepository;

}
