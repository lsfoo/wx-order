import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IShop } from 'app/shared/model/shop.model';
import { AccountService } from 'app/core';
import { ShopService } from './shop.service';

@Component({
    selector: 'jhi-shop',
    templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit, OnDestroy {
    shops: IShop[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected shopService: ShopService,
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
            this.shopService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IShop[]>) => res.ok),
                    map((res: HttpResponse<IShop[]>) => res.body)
                )
                .subscribe((res: IShop[]) => (this.shops = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.shopService
            .query()
            .pipe(
                filter((res: HttpResponse<IShop[]>) => res.ok),
                map((res: HttpResponse<IShop[]>) => res.body)
            )
            .subscribe(
                (res: IShop[]) => {
                    this.shops = res;
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
        this.registerChangeInShops();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IShop) {
        return item.id;
    }

    registerChangeInShops() {
        this.eventSubscriber = this.eventManager.subscribe('shopListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
