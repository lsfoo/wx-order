import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
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

    constructor(
        protected shopService: ShopService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.shopService.query().subscribe(
            (res: HttpResponse<IShop[]>) => {
                this.shops = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
