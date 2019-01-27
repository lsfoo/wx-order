import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISpecs } from 'app/shared/model/specs.model';
import { SpecsService } from './specs.service';
import { IOrderDetails } from 'app/shared/model/order-details.model';
import { OrderDetailsService } from 'app/entities/order-details';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';

@Component({
    selector: 'jhi-specs-update',
    templateUrl: './specs-update.component.html'
})
export class SpecsUpdateComponent implements OnInit {
    specs: ISpecs;
    isSaving: boolean;

    orderdetails: IOrderDetails[];

    products: IProduct[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected specsService: SpecsService,
        protected orderDetailsService: OrderDetailsService,
        protected productService: ProductService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ specs }) => {
            this.specs = specs;
        });
        this.orderDetailsService.query().subscribe(
            (res: HttpResponse<IOrderDetails[]>) => {
                this.orderdetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.productService.query().subscribe(
            (res: HttpResponse<IProduct[]>) => {
                this.products = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.specs.id !== undefined) {
            this.subscribeToSaveResponse(this.specsService.update(this.specs));
        } else {
            this.subscribeToSaveResponse(this.specsService.create(this.specs));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpecs>>) {
        result.subscribe((res: HttpResponse<ISpecs>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOrderDetailsById(index: number, item: IOrderDetails) {
        return item.id;
    }

    trackProductById(index: number, item: IProduct) {
        return item.id;
    }
}
