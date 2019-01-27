import { IUser } from 'app/core/user/user.model';

export interface IShop {
    id?: number;
    name?: string;
    description?: string;
    user?: IUser;
}

export class Shop implements IShop {
    constructor(public id?: number, public name?: string, public description?: string, public user?: IUser) {}
}
