import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
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

    constructor(
        protected orderDetailsService: OrderDetailsService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.orderDetailsService.query().subscribe(
            (res: HttpResponse<IOrderDetails[]>) => {
                this.orderDetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
