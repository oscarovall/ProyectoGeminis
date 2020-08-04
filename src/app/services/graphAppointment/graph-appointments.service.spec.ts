import { TestBed } from '@angular/core/testing';

import { GraphAppointmentsService } from './graph-appointments.service';

describe('GraphAppointmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphAppointmentsService = TestBed.get(GraphAppointmentsService);
    expect(service).toBeTruthy();
  });
});
