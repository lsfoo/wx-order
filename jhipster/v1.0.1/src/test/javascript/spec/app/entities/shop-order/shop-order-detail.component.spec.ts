/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { ShopOrderDetailComponent } from 'app/entities/shop-order/shop-order-detail.component';
import { ShopOrder } from 'app/shared/model/shop-order.model';

describe('Component Tests', () => {
    describe('ShopOrder Management Detail Component', () => {
        let comp: ShopOrderDetailComponent;
        let fixture: ComponentFixture<ShopOrderDetailComponent>;
        const route = ({ data: of({ shopOrder: new ShopOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ShopOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ShopOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ShopOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.shopOrder).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
