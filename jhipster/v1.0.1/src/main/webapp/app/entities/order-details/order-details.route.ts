import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrderDetails } from 'app/shared/model/order-details.model';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsComponent } from './order-details.component';
import { OrderDetailsDetailComponent } from './order-details-detail.component';
import { OrderDetailsUpdateComponent } from './order-details-update.component';
import { OrderDetailsDeletePopupComponent } from './order-details-delete-dialog.component';
import { IOrderDetails } from 'app/shared/model/order-details.model';

@Injectable({ providedIn: 'root' })
export class OrderDetailsResolve implements Resolve<IOrderDetails> {
    constructor(private service: OrderDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderDetails> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<OrderDetails>) => response.ok),
                map((orderDetails: HttpResponse<OrderDetails>) => orderDetails.body)
            );
        }
        return of(new OrderDetails());
    }
}

export const orderDetailsRoute: Routes = [
    {
        path: 'order-details',
        component: OrderDetailsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-details/:id/view',
        component: OrderDetailsDetailComponent,
        resolve: {
            orderDetails: OrderDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-details/new',
        component: OrderDetailsUpdateComponent,
        resolve: {
            orderDetails: OrderDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-details/:id/edit',
        component: OrderDetailsUpdateComponent,
        resolve: {
            orderDetails: OrderDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderDetails'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderDetailsPopupRoute: Routes = [
    {
        path: 'order-details/:id/delete',
        component: OrderDetailsDeletePopupComponent,
        resolve: {
            orderDetails: OrderDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderDetails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
