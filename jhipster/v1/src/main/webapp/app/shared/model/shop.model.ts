import { IUser } from 'app/core/user/user.model';
import { IProduct } from 'app/shared/model//product.model';
import { ICategory } from 'app/shared/model//category.model';
import { IShopOrder } from 'app/shared/model//shop-order.model';

export interface IShop {
    id?: number;
    name?: string;
    user?: IUser;
    products?: IProduct[];
    categories?: ICategory[];
    shopOrders?: IShopOrder[];
}

export class Shop implements IShop {
    constructor(
        public id?: number,
        public name?: string,
        public user?: IUser,
        public products?: IProduct[],
        public categories?: ICategory[],
        public shopOrders?: IShopOrder[]
    ) {}
}
