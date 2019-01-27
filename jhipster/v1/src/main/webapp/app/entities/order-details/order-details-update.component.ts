import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IOrderDetails } from 'app/shared/model/order-details.model';
import { OrderDetailsService } from './order-details.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { ISpecs } from 'app/shared/model/specs.model';
import { SpecsService } from 'app/entities/specs';
import { IShopOrder } from 'app/shared/model/shop-order.model';
import { ShopOrderService } from 'app/entities/shop-order';

@Component({
    selector: 'jhi-order-details-update',
    templateUrl: './order-details-update.component.html'
})
export class OrderDetailsUpdateComponent implements OnInit {
    orderDetails: IOrderDetails;
    isSaving: boolean;

    products: IProduct[];

    specs: ISpecs[];

    shoporders: IShopOrder[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected orderDetailsService: OrderDetailsService,
        protected productService: ProductService,
        protected specsService: SpecsService,
        protected shopOrderService: ShopOrderService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderDetails }) => {
            this.orderDetails = orderDetails;
        });
        this.productService
            .query({ filter: 'orderdetails-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProduct[]>) => response.body)
            )
            .subscribe(
                (res: IProduct[]) => {
                    if (!this.orderDetails.product || !this.orderDetails.product.id) {
                        this.products = res;
                    } else {
                        this.productService
                            .find(this.orderDetails.product.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IProduct>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IProduct>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IProduct) => (this.products = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.specsService
            .query({ filter: 'orderdetails-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ISpecs[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISpecs[]>) => response.body)
            )
            .subscribe(
                (res: ISpecs[]) => {
                    if (!this.orderDetails.specs || !this.orderDetails.specs.id) {
                        this.specs = res;
                    } else {
                        this.specsService
                            .find(this.orderDetails.specs.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ISpecs>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ISpecs>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ISpecs) => (this.specs = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.shopOrderService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IShopOrder[]>) => mayBeOk.ok),
                map((response: HttpResponse<IShopOrder[]>) => response.body)
            )
            .subscribe((res: IShopOrder[]) => (this.shoporders = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.orderDetailsService.update(this.orderDetails));
        } else {
            this.subscribeToSaveResponse(this.orderDetailsService.create(this.orderDetails));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderDetails>>) {
        result.subscribe((res: HttpResponse<IOrderDetails>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProductById(index: number, item: IProduct) {
        return item.id;
    }

    trackSpecsById(index: number, item: ISpecs) {
        return item.id;
    }

    trackShopOrderById(index: number, item: IShopOrder) {
        return item.id;
    }
}
