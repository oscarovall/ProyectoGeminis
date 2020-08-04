import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalGrossProfitComponent } from './total-gross-profit.component';

describe('TotalGrossProfitComponent', () => {
  let component: TotalGrossProfitComponent;
  let fixture: ComponentFixture<TotalGrossProfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalGrossProfitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalGrossProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
