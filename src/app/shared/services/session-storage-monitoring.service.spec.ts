import { TestBed } from '@angular/core/testing';

import { SessionStorageMonitoringService } from './session-storage-monitoring.service';
import {first} from "rxjs";

describe('SessionStorageMonitoringService', () => {
  let service: SessionStorageMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false', () => {
    window.sessionStorage.setItem('addUsuario', 'true')
    service.getAddUsuario().pipe(first()).subscribe({
      next: data => {
        expect(data).toEqual('false')
      }
    })
  })

  it('should return true', () => {
    window.sessionStorage.setItem('addUsuario', 'false')
    service.getAddUsuario().pipe(first()).subscribe({
      next: data => {
        expect(data).toEqual('true')
      }
    })
  })

  it('should set initial value to false', () => {
    window.sessionStorage.setItem('user-logged', 'false')
    service = TestBed.inject(SessionStorageMonitoringService)
  })
});
