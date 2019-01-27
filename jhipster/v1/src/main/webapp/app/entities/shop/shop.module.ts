import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    ShopComponent,
    ShopDetailComponent,
    ShopUpdateComponent,
    ShopDeletePopupComponent,
    ShopDeleteDialogComponent,
    shopRoute,
    shopPopupRoute
} from './';

const ENTITY_STATES = [...shopRoute, ...shopPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ShopComponent, ShopDetailComponent, ShopUpdateComponent, ShopDeleteDialogComponent, ShopDeletePopupComponent],
    entryComponents: [ShopComponent, ShopUpdateComponent, ShopDeleteDialogComponent, ShopDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayShopModule {}
