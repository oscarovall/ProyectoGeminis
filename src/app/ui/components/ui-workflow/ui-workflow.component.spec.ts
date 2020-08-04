import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiWorkflowComponent } from './ui-workflow.component';

describe('UiWorkflowComponent', () => {
  let component: UiWorkflowComponent;
  let fixture: ComponentFixture<UiWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
