import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAospComponent } from './auth-aosp.component';

describe('AuthAospComponent', () => {
  let component: AuthAospComponent;
  let fixture: ComponentFixture<AuthAospComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthAospComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthAospComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
