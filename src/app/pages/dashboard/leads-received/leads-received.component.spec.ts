import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsReceivedComponent } from './leads-received.component';

describe('LeadsReceivedComponent', () => {
  let component: LeadsReceivedComponent;
  let fixture: ComponentFixture<LeadsReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
