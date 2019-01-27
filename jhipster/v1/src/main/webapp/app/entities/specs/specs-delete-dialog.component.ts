import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISpecs } from 'app/shared/model/specs.model';
import { SpecsService } from './specs.service';

@Component({
    selector: 'jhi-specs-delete-dialog',
    templateUrl: './specs-delete-dialog.component.html'
})
export class SpecsDeleteDialogComponent {
    specs: ISpecs;

    constructor(protected specsService: SpecsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.specsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'specsListModification',
                content: 'Deleted an specs'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-specs-delete-popup',
    template: ''
})
export class SpecsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ specs }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SpecsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.specs = specs;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/specs', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/specs', { outlets: { popup: null } }]);
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
