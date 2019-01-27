import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IShopOrder } from 'app/shared/model/shop-order.model';

type EntityResponseType = HttpResponse<IShopOrder>;
type EntityArrayResponseType = HttpResponse<IShopOrder[]>;

@Injectable({ providedIn: 'root' })
export class ShopOrderService {
    public resourceUrl = SERVER_API_URL + 'api/shop-orders';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/shop-orders';

    constructor(protected http: HttpClient) {}

    create(shopOrder: IShopOrder): Observable<EntityResponseType> {
        return this.http.post<IShopOrder>(this.resourceUrl, shopOrder, { observe: 'response' });
    }

    update(shopOrder: IShopOrder): Observable<EntityResponseType> {
        return this.http.put<IShopOrder>(this.resourceUrl, shopOrder, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IShopOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IShopOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IShopOrder[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
