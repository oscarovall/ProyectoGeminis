import { TestBed } from '@angular/core/testing';

import { TotalClosingService } from './total-closing.service';

describe('TotalClosingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TotalClosingService = TestBed.get(TotalClosingService);
    expect(service).toBeTruthy();
  });
});
