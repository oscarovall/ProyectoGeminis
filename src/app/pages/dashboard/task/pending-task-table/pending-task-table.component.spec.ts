import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTaskTableComponent } from './pending-task-table.component';

describe('PendingTaskTableComponent', () => {
  let component: PendingTaskTableComponent;
  let fixture: ComponentFixture<PendingTaskTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingTaskTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTaskTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
