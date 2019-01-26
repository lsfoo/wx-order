import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShopOrder } from 'app/shared/model/shop-order.model';

@Component({
    selector: 'jhi-shop-order-detail',
    templateUrl: './shop-order-detail.component.html'
})
export class ShopOrderDetailComponent implements OnInit {
    shopOrder: IShopOrder;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ shopOrder }) => {
            this.shopOrder = shopOrder;
        });
    }

    previousState() {
        window.history.back();
    }
}
