import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TCNotificationLayoutComponent } from './notification-layout.component';

describe('TCNotificationLayoutComponent', () => {
  let component: TCNotificationLayoutComponent;
  let fixture: ComponentFixture<TCNotificationLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TCNotificationLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCNotificationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
