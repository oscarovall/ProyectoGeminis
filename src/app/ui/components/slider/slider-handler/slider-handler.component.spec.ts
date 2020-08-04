import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TCSliderHandlerComponent } from './slider-handler.component';

describe('TCSliderHandlerComponent', () => {
  let component: TCSliderHandlerComponent;
  let fixture: ComponentFixture<TCSliderHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TCSliderHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCSliderHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
