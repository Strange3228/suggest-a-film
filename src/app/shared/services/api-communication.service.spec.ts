import { TestBed } from '@angular/core/testing';

import { ApiCommunicationService } from './api-communication.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ApiCommunicationService', () => {
  let service: ApiCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ApiCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
