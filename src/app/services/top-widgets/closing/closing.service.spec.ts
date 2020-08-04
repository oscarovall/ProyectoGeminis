import { TestBed } from '@angular/core/testing';

import { ClosingService } from './closing.service';

describe('ClosingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClosingService = TestBed.get(ClosingService);
    expect(service).toBeTruthy();
  });
});
