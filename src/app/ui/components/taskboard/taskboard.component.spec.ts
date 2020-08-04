import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TCTaskboardComponent } from './taskboard.component';

describe('TCTaskboardComponent', () => {
  let component: TCTaskboardComponent;
  let fixture: ComponentFixture<TCTaskboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TCTaskboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCTaskboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
