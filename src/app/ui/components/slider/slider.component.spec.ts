import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TCSliderComponent } from './slider.component';

describe('TCSliderComponent', () => {
  let component: TCSliderComponent;
  let fixture: ComponentFixture<TCSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TCSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
