import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IShopOrder } from 'app/shared/model/shop-order.model';
import { ShopOrderService } from './shop-order.service';
import { IShop } from 'app/shared/model/shop.model';
import { ShopService } from 'app/entities/shop';

@Component({
    selector: 'jhi-shop-order-update',
    templateUrl: './shop-order-update.component.html'
})
export class ShopOrderUpdateComponent implements OnInit {
    shopOrder: IShopOrder;
    isSaving: boolean;

    shops: IShop[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected shopOrderService: ShopOrderService,
        protected shopService: ShopService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ shopOrder }) => {
            this.shopOrder = shopOrder;
        });
        this.shopService.query().subscribe(
            (res: HttpResponse<IShop[]>) => {
                this.shops = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.shopOrder.id !== undefined) {
            this.subscribeToSaveResponse(this.shopOrderService.update(this.shopOrder));
        } else {
            this.subscribeToSaveResponse(this.shopOrderService.create(this.shopOrder));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IShopOrder>>) {
        result.subscribe((res: HttpResponse<IShopOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackShopById(index: number, item: IShop) {
        return item.id;
    }
}
