import { IOrderDetails } from 'app/shared/model//order-details.model';
import { IProduct } from 'app/shared/model//product.model';

export interface ISpecs {
    id?: number;
    name?: string;
    price?: number;
    stock?: number;
    orderDetails?: IOrderDetails;
    product?: IProduct;
}

export class Specs implements ISpecs {
    constructor(
        public id?: number,
        public name?: string,
        public price?: number,
        public stock?: number,
        public orderDetails?: IOrderDetails,
        public product?: IProduct
    ) {}
}
