/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { SpecsComponent } from 'app/entities/specs/specs.component';
import { SpecsService } from 'app/entities/specs/specs.service';
import { Specs } from 'app/shared/model/specs.model';

describe('Component Tests', () => {
    describe('Specs Management Component', () => {
        let comp: SpecsComponent;
        let fixture: ComponentFixture<SpecsComponent>;
        let service: SpecsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SpecsComponent],
                providers: []
            })
                .overrideTemplate(SpecsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SpecsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpecsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Specs(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.specs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
