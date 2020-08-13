import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectRsoComponent } from './reject-rso.component';

describe('RejectRsoComponent', () => {
  let component: RejectRsoComponent;
  let fixture: ComponentFixture<RejectRsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectRsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectRsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
