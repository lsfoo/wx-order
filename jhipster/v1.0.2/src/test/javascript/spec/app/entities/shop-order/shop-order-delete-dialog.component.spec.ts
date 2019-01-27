/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { ShopOrderDeleteDialogComponent } from 'app/entities/shop-order/shop-order-delete-dialog.component';
import { ShopOrderService } from 'app/entities/shop-order/shop-order.service';

describe('Component Tests', () => {
    describe('ShopOrder Management Delete Component', () => {
        let comp: ShopOrderDeleteDialogComponent;
        let fixture: ComponentFixture<ShopOrderDeleteDialogComponent>;
        let service: ShopOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ShopOrderDeleteDialogComponent]
            })
                .overrideTemplate(ShopOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ShopOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShopOrderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
