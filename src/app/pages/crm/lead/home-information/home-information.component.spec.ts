import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInformationComponent } from './home-information.component';

describe('HomeInformationComponent', () => {
  let component: HomeInformationComponent;
  let fixture: ComponentFixture<HomeInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
