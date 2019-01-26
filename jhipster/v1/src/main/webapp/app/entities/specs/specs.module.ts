import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    SpecsComponent,
    SpecsDetailComponent,
    SpecsUpdateComponent,
    SpecsDeletePopupComponent,
    SpecsDeleteDialogComponent,
    specsRoute,
    specsPopupRoute
} from './';

const ENTITY_STATES = [...specsRoute, ...specsPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SpecsComponent, SpecsDetailComponent, SpecsUpdateComponent, SpecsDeleteDialogComponent, SpecsDeletePopupComponent],
    entryComponents: [SpecsComponent, SpecsUpdateComponent, SpecsDeleteDialogComponent, SpecsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySpecsModule {}
