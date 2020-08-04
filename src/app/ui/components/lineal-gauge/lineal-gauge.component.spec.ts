import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinealGaugeComponent } from './lineal-gauge.component';

describe('LinealGaugeComponent', () => {
  let component: LinealGaugeComponent;
  let fixture: ComponentFixture<LinealGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinealGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinealGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
