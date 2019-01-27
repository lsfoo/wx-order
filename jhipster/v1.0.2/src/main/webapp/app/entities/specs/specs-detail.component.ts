import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpecs } from 'app/shared/model/specs.model';

@Component({
    selector: 'jhi-specs-detail',
    templateUrl: './specs-detail.component.html'
})
export class SpecsDetailComponent implements OnInit {
    specs: ISpecs;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ specs }) => {
            this.specs = specs;
        });
    }

    previousState() {
        window.history.back();
    }
}
