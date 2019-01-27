import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ShopOrder } from 'app/shared/model/shop-order.model';
import { ShopOrderService } from './shop-order.service';
import { ShopOrderComponent } from './shop-order.component';
import { ShopOrderDetailComponent } from './shop-order-detail.component';
import { ShopOrderUpdateComponent } from './shop-order-update.component';
import { ShopOrderDeletePopupComponent } from './shop-order-delete-dialog.component';
import { IShopOrder } from 'app/shared/model/shop-order.model';

@Injectable({ providedIn: 'root' })
export class ShopOrderResolve implements Resolve<IShopOrder> {
    constructor(private service: ShopOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ShopOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ShopOrder>) => response.ok),
                map((shopOrder: HttpResponse<ShopOrder>) => shopOrder.body)
            );
        }
        return of(new ShopOrder());
    }
}

export const shopOrderRoute: Routes = [
    {
        path: 'shop-order',
        component: ShopOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ShopOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'shop-order/:id/view',
        component: ShopOrderDetailComponent,
        resolve: {
            shopOrder: ShopOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ShopOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'shop-order/new',
        component: ShopOrderUpdateComponent,
        resolve: {
            shopOrder: ShopOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ShopOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'shop-order/:id/edit',
        component: ShopOrderUpdateComponent,
        resolve: {
            shopOrder: ShopOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ShopOrders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const shopOrderPopupRoute: Routes = [
    {
        path: 'shop-order/:id/delete',
        component: ShopOrderDeletePopupComponent,
        resolve: {
            shopOrder: ShopOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ShopOrders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
