import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Specs } from 'app/shared/model/specs.model';
import { SpecsService } from './specs.service';
import { SpecsComponent } from './specs.component';
import { SpecsDetailComponent } from './specs-detail.component';
import { SpecsUpdateComponent } from './specs-update.component';
import { SpecsDeletePopupComponent } from './specs-delete-dialog.component';
import { ISpecs } from 'app/shared/model/specs.model';

@Injectable({ providedIn: 'root' })
export class SpecsResolve implements Resolve<ISpecs> {
    constructor(private service: SpecsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISpecs> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Specs>) => response.ok),
                map((specs: HttpResponse<Specs>) => specs.body)
            );
        }
        return of(new Specs());
    }
}

export const specsRoute: Routes = [
    {
        path: '',
        component: SpecsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Specs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SpecsDetailComponent,
        resolve: {
            specs: SpecsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Specs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SpecsUpdateComponent,
        resolve: {
            specs: SpecsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Specs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SpecsUpdateComponent,
        resolve: {
            specs: SpecsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Specs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const specsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SpecsDeletePopupComponent,
        resolve: {
            specs: SpecsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Specs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
