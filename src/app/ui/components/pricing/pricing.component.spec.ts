import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TCPricingComponent } from './pricing.component';

describe('TCPricingComponent', () => {
  let component: TCPricingComponent;
  let fixture: ComponentFixture<TCPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TCPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
