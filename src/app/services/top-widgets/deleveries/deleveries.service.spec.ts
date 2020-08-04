import { TestBed } from '@angular/core/testing';

import { DeleveriesService } from './deleveries.service';

describe('DeleveriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleveriesService = TestBed.get(DeleveriesService);
    expect(service).toBeTruthy();
  });
});
