import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoHomesComponent } from './promo-homes.component';

describe('PromoHomesComponent', () => {
  let component: PromoHomesComponent;
  let fixture: ComponentFixture<PromoHomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoHomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
