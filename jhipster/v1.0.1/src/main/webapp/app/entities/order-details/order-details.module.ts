import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    OrderDetailsComponent,
    OrderDetailsDetailComponent,
    OrderDetailsUpdateComponent,
    OrderDetailsDeletePopupComponent,
    OrderDetailsDeleteDialogComponent,
    orderDetailsRoute,
    orderDetailsPopupRoute
} from './';

const ENTITY_STATES = [...orderDetailsRoute, ...orderDetailsPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderDetailsComponent,
        OrderDetailsDetailComponent,
        OrderDetailsUpdateComponent,
        OrderDetailsDeleteDialogComponent,
        OrderDetailsDeletePopupComponent
    ],
    entryComponents: [
        OrderDetailsComponent,
        OrderDetailsUpdateComponent,
        OrderDetailsDeleteDialogComponent,
        OrderDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayOrderDetailsModule {}
