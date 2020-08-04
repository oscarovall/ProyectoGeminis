import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TCTabComponent } from './tab.component';

describe('TabComponent', () => {
  let component: TCTabComponent;
  let fixture: ComponentFixture<TCTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TCTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
