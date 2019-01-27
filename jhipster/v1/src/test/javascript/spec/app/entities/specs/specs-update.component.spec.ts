/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { SpecsUpdateComponent } from 'app/entities/specs/specs-update.component';
import { SpecsService } from 'app/entities/specs/specs.service';
import { Specs } from 'app/shared/model/specs.model';

describe('Component Tests', () => {
    describe('Specs Management Update Component', () => {
        let comp: SpecsUpdateComponent;
        let fixture: ComponentFixture<SpecsUpdateComponent>;
        let service: SpecsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SpecsUpdateComponent]
            })
                .overrideTemplate(SpecsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SpecsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpecsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Specs(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.specs = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Specs();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.specs = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
