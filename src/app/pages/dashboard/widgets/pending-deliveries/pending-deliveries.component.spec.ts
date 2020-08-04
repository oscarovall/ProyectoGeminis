import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDeliveriesComponent } from './pending-deliveries.component';

describe('PendingDeliveriesComponent', () => {
  let component: PendingDeliveriesComponent;
  let fixture: ComponentFixture<PendingDeliveriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDeliveriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
