import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRsoComponent } from './pending-rso.component';

describe('PendingRsoComponent', () => {
  let component: PendingRsoComponent;
  let fixture: ComponentFixture<PendingRsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingRsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
