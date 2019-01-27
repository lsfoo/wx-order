import { ICategory } from 'app/shared/model/category.model';
import { IShop } from 'app/shared/model/shop.model';
import { IOrderDetails } from 'app/shared/model/order-details.model';

export interface IProduct {
    id?: number;
    name?: string;
    thumbnail?: string;
    description?: string;
    category?: ICategory;
    shop?: IShop;
    orderDetails?: IOrderDetails;
}

export class Product implements IProduct {
    constructor(
        public id?: number,
        public name?: string,
        public thumbnail?: string,
        public description?: string,
        public category?: ICategory,
        public shop?: IShop,
        public orderDetails?: IOrderDetails
    ) {}
}
