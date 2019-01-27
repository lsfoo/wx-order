import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
    currentSearch: string;

    constructor(
        protected shopOrderService: ShopOrderService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.shopOrderService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IShopOrder[]>) => res.ok),
                    map((res: HttpResponse<IShopOrder[]>) => res.body)
                )
                .subscribe((res: IShopOrder[]) => (this.shopOrders = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.shopOrderService
            .query()
            .pipe(
                filter((res: HttpResponse<IShopOrder[]>) => res.ok),
                map((res: HttpResponse<IShopOrder[]>) => res.body)
            )
            .subscribe(
                (res: IShopOrder[]) => {
                    this.shopOrders = res;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
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
