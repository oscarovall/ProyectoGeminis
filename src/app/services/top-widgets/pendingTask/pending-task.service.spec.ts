import { TestBed } from '@angular/core/testing';

import { PendingTaskService } from './pending-task.service';

describe('PendingTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingTaskService = TestBed.get(PendingTaskService);
    expect(service).toBeTruthy();
  });
});
