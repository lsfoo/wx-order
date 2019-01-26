/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { OrderDetailsDetailComponent } from 'app/entities/order-details/order-details-detail.component';
import { OrderDetails } from 'app/shared/model/order-details.model';

describe('Component Tests', () => {
    describe('OrderDetails Management Detail Component', () => {
        let comp: OrderDetailsDetailComponent;
        let fixture: ComponentFixture<OrderDetailsDetailComponent>;
        const route = ({ data: of({ orderDetails: new OrderDetails(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [OrderDetailsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderDetailsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderDetailsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderDetails).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
