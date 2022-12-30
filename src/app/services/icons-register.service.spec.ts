import { TestBed } from '@angular/core/testing';

import { IconsRegisterService } from './icons-register.service';

describe('IconsRegisterService', () => {
  let service: IconsRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconsRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
