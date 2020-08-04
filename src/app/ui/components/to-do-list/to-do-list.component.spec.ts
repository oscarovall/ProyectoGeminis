import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TCToDoListComponent } from './to-do-list.component';

describe('TCToDoListComponent', () => {
  let component: TCToDoListComponent;
  let fixture: ComponentFixture<TCToDoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TCToDoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCToDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
