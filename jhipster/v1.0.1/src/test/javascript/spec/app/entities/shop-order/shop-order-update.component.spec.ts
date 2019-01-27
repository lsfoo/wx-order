/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { ShopOrderUpdateComponent } from 'app/entities/shop-order/shop-order-update.component';
import { ShopOrderService } from 'app/entities/shop-order/shop-order.service';
import { ShopOrder } from 'app/shared/model/shop-order.model';

describe('Component Tests', () => {
    describe('ShopOrder Management Update Component', () => {
        let comp: ShopOrderUpdateComponent;
        let fixture: ComponentFixture<ShopOrderUpdateComponent>;
        let service: ShopOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ShopOrderUpdateComponent]
            })
                .overrideTemplate(ShopOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ShopOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShopOrderService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ShopOrder(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.shopOrder = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ShopOrder();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.shopOrder = entity;
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
