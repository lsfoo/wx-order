export * from './accountResource.service';
import { AccountResourceService } from './accountResource.service';
export * from './categoryResource.service';
import { CategoryResourceService } from './categoryResource.service';
export * from './orderDetailsResource.service';
import { OrderDetailsResourceService } from './orderDetailsResource.service';
export * from './productResource.service';
import { ProductResourceService } from './productResource.service';
export * from './shopOrderResource.service';
import { ShopOrderResourceService } from './shopOrderResource.service';
export * from './shopResource.service';
import { ShopResourceService } from './shopResource.service';
export * from './specsResource.service';
import { SpecsResourceService } from './specsResource.service';
export * from './userJwtController.service';
import { UserJwtControllerService } from './userJwtController.service';
export * from './userResource.service';
import { UserResourceService } from './userResource.service';
export const APIS = [AccountResourceService, CategoryResourceService, OrderDetailsResourceService, ProductResourceService, ShopOrderResourceService, ShopResourceService, SpecsResourceService, UserJwtControllerService, UserResourceService];
