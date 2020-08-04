import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalClosingsComponent } from './total-closings.component';

describe('TotalClosingsComponent', () => {
  let component: TotalClosingsComponent;
  let fixture: ComponentFixture<TotalClosingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalClosingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalClosingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
