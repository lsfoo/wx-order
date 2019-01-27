import { IProduct } from 'app/shared/model/product.model';
import { IOrderDetails } from 'app/shared/model/order-details.model';

export interface ISpecs {
    id?: number;
    name?: string;
    price?: number;
    stock?: number;
    product?: IProduct;
    orderDetails?: IOrderDetails;
}

export class Specs implements ISpecs {
    constructor(
        public id?: number,
        public name?: string,
        public price?: number,
        public stock?: number,
        public product?: IProduct,
        public orderDetails?: IOrderDetails
    ) {}
}
