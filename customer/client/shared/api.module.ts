import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AccountResourceService } from './api/accountResource.service';
import { CategoryResourceService } from './api/categoryResource.service';
import { CustomerResourceService } from './api/customerResource.service';
import { DeskResourceService } from './api/deskResource.service';
import { OrderDetailsResourceService } from './api/orderDetailsResource.service';
import { OrderFormResourceService } from './api/orderFormResource.service';
import { ProductResourceService } from './api/productResource.service';
import { SpecsResourceService } from './api/specsResource.service';
import { StoreResourceService } from './api/storeResource.service';
import { UnitResourceService } from './api/unitResource.service';
import { UserJwtControllerService } from './api/userJwtController.service';
import { UserResourceService } from './api/userResource.service';
import { VipResourceService } from './api/vipResource.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AccountResourceService,
    CategoryResourceService,
    CustomerResourceService,
    DeskResourceService,
    OrderDetailsResourceService,
    OrderFormResourceService,
    ProductResourceService,
    SpecsResourceService,
    StoreResourceService,
    UnitResourceService,
    UserJwtControllerService,
    UserResourceService,
    VipResourceService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
