import { IProduct } from 'app/shared/model/product.model';
import { ISpecs } from 'app/shared/model/specs.model';
import { IShopOrder } from 'app/shared/model/shop-order.model';

export interface IOrderDetails {
    id?: number;
    product?: IProduct;
    specs?: ISpecs;
    shopOrder?: IShopOrder;
}

export class OrderDetails implements IOrderDetails {
    constructor(public id?: number, public product?: IProduct, public specs?: ISpecs, public shopOrder?: IShopOrder) {}
}
