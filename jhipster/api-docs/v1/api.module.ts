import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AccountResourceService } from './api/accountResource.service';
import { CategoryResourceService } from './api/categoryResource.service';
import { OrderDetailsResourceService } from './api/orderDetailsResource.service';
import { ProductResourceService } from './api/productResource.service';
import { ShopOrderResourceService } from './api/shopOrderResource.service';
import { ShopResourceService } from './api/shopResource.service';
import { SpecsResourceService } from './api/specsResource.service';
import { UserJwtControllerService } from './api/userJwtController.service';
import { UserResourceService } from './api/userResource.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AccountResourceService,
    CategoryResourceService,
    OrderDetailsResourceService,
    ProductResourceService,
    ShopOrderResourceService,
    ShopResourceService,
    SpecsResourceService,
    UserJwtControllerService,
    UserResourceService ]
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
