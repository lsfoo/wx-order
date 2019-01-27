import { IShop } from 'app/shared/model/shop.model';

export interface ICategory {
    id?: number;
    name?: string;
    sort?: number;
    shop?: IShop;
}

export class Category implements ICategory {
    constructor(public id?: number, public name?: string, public sort?: number, public shop?: IShop) {}
}
