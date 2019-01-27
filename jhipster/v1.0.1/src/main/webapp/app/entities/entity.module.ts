import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayCategoryModule } from './category/category.module';
import { GatewayProductModule } from './product/product.module';
import { GatewaySpecsModule } from './specs/specs.module';
import { GatewayShopModule } from './shop/shop.module';
import { GatewayShopOrderModule } from './shop-order/shop-order.module';
import { GatewayOrderDetailsModule } from './order-details/order-details.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        GatewayCategoryModule,
        GatewayProductModule,
        GatewaySpecsModule,
        GatewayShopModule,
        GatewayShopOrderModule,
        GatewayOrderDetailsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
