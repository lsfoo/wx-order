import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IShop } from 'app/shared/model/shop.model';
import { ShopService } from './shop.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-shop-update',
    templateUrl: './shop-update.component.html'
})
export class ShopUpdateComponent implements OnInit {
    shop: IShop;
    isSaving: boolean;

    users: IUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected shopService: ShopService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ shop }) => {
            this.shop = shop;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.shop.id !== undefined) {
            this.subscribeToSaveResponse(this.shopService.update(this.shop));
        } else {
            this.subscribeToSaveResponse(this.shopService.create(this.shop));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IShop>>) {
        result.subscribe((res: HttpResponse<IShop>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
