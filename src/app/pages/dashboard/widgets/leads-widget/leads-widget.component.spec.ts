import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsWidgetComponent } from './leads-widget.component';

describe('LeadsWidgetComponent', () => {
  let component: LeadsWidgetComponent;
  let fixture: ComponentFixture<LeadsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
