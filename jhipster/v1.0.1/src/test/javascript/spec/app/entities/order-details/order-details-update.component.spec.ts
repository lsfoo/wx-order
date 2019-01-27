/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { OrderDetailsUpdateComponent } from 'app/entities/order-details/order-details-update.component';
import { OrderDetailsService } from 'app/entities/order-details/order-details.service';
import { OrderDetails } from 'app/shared/model/order-details.model';

describe('Component Tests', () => {
    describe('OrderDetails Management Update Component', () => {
        let comp: OrderDetailsUpdateComponent;
        let fixture: ComponentFixture<OrderDetailsUpdateComponent>;
        let service: OrderDetailsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [OrderDetailsUpdateComponent]
            })
                .overrideTemplate(OrderDetailsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderDetailsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderDetailsService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new OrderDetails(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.orderDetails = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new OrderDetails();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.orderDetails = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
