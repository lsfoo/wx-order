package com.lsfoo.wx.gateway.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of SpecsSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class SpecsSearchRepositoryMockConfiguration {

    @MockBean
    private SpecsSearchRepository mockSpecsSearchRepository;

}
