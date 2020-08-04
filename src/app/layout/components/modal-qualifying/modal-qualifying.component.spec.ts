import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQUALIFYINGComponent } from './modal-qualifying.component';

describe('ModalQUALIFYINGComponent', () => {
  let component: ModalQUALIFYINGComponent;
  let fixture: ComponentFixture<ModalQUALIFYINGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalQUALIFYINGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQUALIFYINGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
