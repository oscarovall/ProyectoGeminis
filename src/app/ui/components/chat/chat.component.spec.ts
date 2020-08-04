import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TPChatComponent } from './tp-chat.component';

describe('TPChatComponent', () => {
  let component: TPChatComponent;
  let fixture: ComponentFixture<TPChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TPChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TPChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
