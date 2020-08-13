import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeHomeRsoComponent } from './change-home-rso.component';

describe('ChangeHomeRsoComponent', () => {
  let component: ChangeHomeRsoComponent;
  let fixture: ComponentFixture<ChangeHomeRsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeHomeRsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeHomeRsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
