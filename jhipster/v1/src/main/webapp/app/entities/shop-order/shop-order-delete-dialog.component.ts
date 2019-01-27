import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShopOrder } from 'app/shared/model/shop-order.model';
import { ShopOrderService } from './shop-order.service';

@Component({
    selector: 'jhi-shop-order-delete-dialog',
    templateUrl: './shop-order-delete-dialog.component.html'
})
export class ShopOrderDeleteDialogComponent {
    shopOrder: IShopOrder;

    constructor(
        protected shopOrderService: ShopOrderService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.shopOrderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'shopOrderListModification',
                content: 'Deleted an shopOrder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-shop-order-delete-popup',
    template: ''
})
export class ShopOrderDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ shopOrder }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ShopOrderDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.shopOrder = shopOrder;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/shop-order', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/shop-order', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
