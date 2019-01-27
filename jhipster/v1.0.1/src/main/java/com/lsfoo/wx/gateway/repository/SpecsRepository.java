package com.lsfoo.wx.gateway.repository;

import com.lsfoo.wx.gateway.domain.Specs;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Specs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpecsRepository extends JpaRepository<Specs, Long> {

}
