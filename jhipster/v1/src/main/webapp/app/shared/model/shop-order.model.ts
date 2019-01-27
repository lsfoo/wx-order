import { IShop } from 'app/shared/model/shop.model';

export interface IShopOrder {
    id?: number;
    orderNo?: string;
    totalMoney?: number;
    shop?: IShop;
}

export class ShopOrder implements IShopOrder {
    constructor(public id?: number, public orderNo?: string, public totalMoney?: number, public shop?: IShop) {}
}
