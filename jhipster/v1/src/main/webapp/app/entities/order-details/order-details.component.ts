import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderDetails } from 'app/shared/model/order-details.model';
import { AccountService } from 'app/core';
import { OrderDetailsService } from './order-details.service';

@Component({
    selector: 'jhi-order-details',
    templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
    orderDetails: IOrderDetails[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected orderDetailsService: OrderDetailsService,
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
            this.orderDetailsService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IOrderDetails[]>) => (this.orderDetails = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.orderDetailsService.query().subscribe(
            (res: HttpResponse<IOrderDetails[]>) => {
                this.orderDetails = res.body;
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
        this.registerChangeInOrderDetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrderDetails) {
        return item.id;
    }

    registerChangeInOrderDetails() {
        this.eventSubscriber = this.eventManager.subscribe('orderDetailsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
