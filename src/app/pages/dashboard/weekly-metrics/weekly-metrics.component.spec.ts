import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyMetricsComponent } from './weekly-metrics.component';

describe('WeeklyMetricsComponent', () => {
  let component: WeeklyMetricsComponent;
  let fixture: ComponentFixture<WeeklyMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
