import { TestBed } from '@angular/core/testing';

import { StatusLeadsService } from './status-leads.service';

describe('StatusLeadsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusLeadsService = TestBed.get(StatusLeadsService);
    expect(service).toBeTruthy();
  });
});
