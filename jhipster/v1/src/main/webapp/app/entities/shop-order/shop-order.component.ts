import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IShopOrder } from 'app/shared/model/shop-order.model';
import { AccountService } from 'app/core';
import { ShopOrderService } from './shop-order.service';

@Component({
    selector: 'jhi-shop-order',
    templateUrl: './shop-order.component.html'
})
export class ShopOrderComponent implements OnInit, OnDestroy {
    shopOrders: IShopOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected shopOrderService: ShopOrderService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.shopOrderService.query().subscribe(
            (res: HttpResponse<IShopOrder[]>) => {
                this.shopOrders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInShopOrders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IShopOrder) {
        return item.id;
    }

    registerChangeInShopOrders() {
        this.eventSubscriber = this.eventManager.subscribe('shopOrderListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
