import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    ShopOrderComponent,
    ShopOrderDetailComponent,
    ShopOrderUpdateComponent,
    ShopOrderDeletePopupComponent,
    ShopOrderDeleteDialogComponent,
    shopOrderRoute,
    shopOrderPopupRoute
} from './';

const ENTITY_STATES = [...shopOrderRoute, ...shopOrderPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ShopOrderComponent,
        ShopOrderDetailComponent,
        ShopOrderUpdateComponent,
        ShopOrderDeleteDialogComponent,
        ShopOrderDeletePopupComponent
    ],
    entryComponents: [ShopOrderComponent, ShopOrderUpdateComponent, ShopOrderDeleteDialogComponent, ShopOrderDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayShopOrderModule {}
