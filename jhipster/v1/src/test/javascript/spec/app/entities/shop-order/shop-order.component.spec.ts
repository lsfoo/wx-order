/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ShopOrderComponent } from 'app/entities/shop-order/shop-order.component';
import { ShopOrderService } from 'app/entities/shop-order/shop-order.service';
import { ShopOrder } from 'app/shared/model/shop-order.model';

describe('Component Tests', () => {
    describe('ShopOrder Management Component', () => {
        let comp: ShopOrderComponent;
        let fixture: ComponentFixture<ShopOrderComponent>;
        let service: ShopOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ShopOrderComponent],
                providers: []
            })
                .overrideTemplate(ShopOrderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ShopOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShopOrderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ShopOrder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.shopOrders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
