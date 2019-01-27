import { ISpecs } from 'app/shared/model//specs.model';
import { IShop } from 'app/shared/model//shop.model';
import { IOrderDetails } from 'app/shared/model//order-details.model';
import { ICategory } from 'app/shared/model//category.model';

export interface IProduct {
    id?: number;
    name?: string;
    thumbnail?: string;
    description?: string;
    specs?: ISpecs[];
    shop?: IShop;
    orderDetails?: IOrderDetails;
    category?: ICategory;
}

export class Product implements IProduct {
    constructor(
        public id?: number,
        public name?: string,
        public thumbnail?: string,
        public description?: string,
        public specs?: ISpecs[],
        public shop?: IShop,
        public orderDetails?: IOrderDetails,
        public category?: ICategory
    ) {}
}
