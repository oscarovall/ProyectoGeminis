import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphAppoinmetsComponent } from './graph-appoinmets.component';

describe('GraphAppoinmetsComponent', () => {
  let component: GraphAppoinmetsComponent;
  let fixture: ComponentFixture<GraphAppoinmetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphAppoinmetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphAppoinmetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
