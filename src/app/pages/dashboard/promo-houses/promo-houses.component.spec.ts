import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoHousesComponent } from './promo-houses.component';

describe('PromoHousesComponent', () => {
  let component: PromoHousesComponent;
  let fixture: ComponentFixture<PromoHousesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoHousesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
