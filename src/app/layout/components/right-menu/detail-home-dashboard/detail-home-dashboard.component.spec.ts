import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHomeDashboardComponent } from './detail-home-dashboard.component';

describe('DetailHomeDashboardComponent', () => {
  let component: DetailHomeDashboardComponent;
  let fixture: ComponentFixture<DetailHomeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailHomeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHomeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
