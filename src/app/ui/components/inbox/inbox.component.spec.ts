import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TCInboxComponent } from './inbox.component';

describe('TCInboxComponent', () => {
  let component: TCInboxComponent;
  let fixture: ComponentFixture<TCInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TCInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
