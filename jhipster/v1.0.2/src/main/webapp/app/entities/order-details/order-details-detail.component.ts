import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderDetails } from 'app/shared/model/order-details.model';

@Component({
    selector: 'jhi-order-details-detail',
    templateUrl: './order-details-detail.component.html'
})
export class OrderDetailsDetailComponent implements OnInit {
    orderDetails: IOrderDetails;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderDetails }) => {
            this.orderDetails = orderDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}
