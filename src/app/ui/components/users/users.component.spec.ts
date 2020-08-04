import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TCUsersComponent } from './users.component';

describe('TCUsersComponent', () => {
  let component: TCUsersComponent;
  let fixture: ComponentFixture<TCUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TCUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
