import { IShop } from 'app/shared/model//shop.model';
import { IOrderDetails } from 'app/shared/model//order-details.model';

export interface IShopOrder {
    id?: number;
    orderNo?: string;
    totalMoney?: number;
    shop?: IShop;
    orderDetails?: IOrderDetails[];
}

export class ShopOrder implements IShopOrder {
    constructor(
        public id?: number,
        public orderNo?: string,
        public totalMoney?: number,
        public shop?: IShop,
        public orderDetails?: IOrderDetails[]
    ) {}
}
