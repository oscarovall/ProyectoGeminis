import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiNormalStepComponent } from './ui-normal-step.component';

describe('UiNormalStepComponent', () => {
  let component: UiNormalStepComponent;
  let fixture: ComponentFixture<UiNormalStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiNormalStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiNormalStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
