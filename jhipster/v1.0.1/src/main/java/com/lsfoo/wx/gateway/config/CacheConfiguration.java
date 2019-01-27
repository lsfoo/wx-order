package com.lsfoo.wx.gateway.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.lsfoo.wx.gateway.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.Category.class.getName(), jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.Category.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.Product.class.getName(), jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.Product.class.getName() + ".specs", jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.Specs.class.getName(), jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.Shop.class.getName(), jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.Shop.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.Shop.class.getName() + ".categories", jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.Shop.class.getName() + ".shopOrders", jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.ShopOrder.class.getName(), jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.ShopOrder.class.getName() + ".orderDetails", jcacheConfiguration);
            cm.createCache(com.lsfoo.wx.gateway.domain.OrderDetails.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
