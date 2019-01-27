import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'category',
                loadChildren: './category/category.module#GatewayCategoryModule'
            },
            {
                path: 'product',
                loadChildren: './product/product.module#GatewayProductModule'
            },
            {
                path: 'specs',
                loadChildren: './specs/specs.module#GatewaySpecsModule'
            },
            {
                path: 'shop',
                loadChildren: './shop/shop.module#GatewayShopModule'
            },
            {
                path: 'shop-order',
                loadChildren: './shop-order/shop-order.module#GatewayShopOrderModule'
            },
            {
                path: 'order-details',
                loadChildren: './order-details/order-details.module#GatewayOrderDetailsModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
