/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { SpecsDetailComponent } from 'app/entities/specs/specs-detail.component';
import { Specs } from 'app/shared/model/specs.model';

describe('Component Tests', () => {
    describe('Specs Management Detail Component', () => {
        let comp: SpecsDetailComponent;
        let fixture: ComponentFixture<SpecsDetailComponent>;
        const route = ({ data: of({ specs: new Specs(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SpecsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SpecsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SpecsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.specs).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
