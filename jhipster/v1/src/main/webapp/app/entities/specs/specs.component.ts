import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISpecs } from 'app/shared/model/specs.model';
import { AccountService } from 'app/core';
import { SpecsService } from './specs.service';

@Component({
    selector: 'jhi-specs',
    templateUrl: './specs.component.html'
})
export class SpecsComponent implements OnInit, OnDestroy {
    specs: ISpecs[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected specsService: SpecsService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.specsService.query().subscribe(
            (res: HttpResponse<ISpecs[]>) => {
                this.specs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSpecs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISpecs) {
        return item.id;
    }

    registerChangeInSpecs() {
        this.eventSubscriber = this.eventManager.subscribe('specsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
