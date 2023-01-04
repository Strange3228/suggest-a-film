import { TestBed } from '@angular/core/testing';

import { SessionStorageMonitoringService } from './session-storage-monitoring.service';

describe('SessionStorageMonitoringService', () => {
  let service: SessionStorageMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
