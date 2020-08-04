import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTaskTableComponent } from './team-task-table.component';

describe('TeamTaskTableComponent', () => {
  let component: TeamTaskTableComponent;
  let fixture: ComponentFixture<TeamTaskTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamTaskTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTaskTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
