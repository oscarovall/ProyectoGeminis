import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TCNotificationComponent } from './notification.component';

describe('TCNotificationComponent', () => {
  let component: TCNotificationComponent;
  let fixture: ComponentFixture<TCNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TCNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
