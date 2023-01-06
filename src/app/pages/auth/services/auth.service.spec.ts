import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "../../../../environments/environment";
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create request token v4', () => {
    const dummyResponse = {
      "accessToken": "5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
      "refreshToken": "EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
    };
    service.createRequestToken().subscribe(data => {expect(data).toEqual(dummyResponse)})
    const req = httpMock.expectOne(environment.ApiBase4 + 'auth/request_token')
    expect(req.request.method).toBe("POST");
    req.flush(dummyResponse);
  })
  it('should create request token v4 (error)', () => {
    const dummyResponse = {
      "accessToken": "5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
      "refreshToken": "EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
    };
    let errResponse: any;
    service.createRequestToken().subscribe({
      next: data => {
        expect(data).toEqual(dummyResponse);
      },
      error: err => {
        errResponse = err
      }
    })
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const req = httpMock.expectOne(environment.ApiBase4 + 'auth/request_token')
    req.flush(dummyResponse,mockErrorResponse);
    expect(errResponse.status).toEqual(400);
  })

  it('should create request token v3', () => {
    const dummyResponse = {
      "accessToken": "5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
      "refreshToken": "EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
    };
    service.createRequestTokenV3().subscribe(data => {expect(data).toEqual(dummyResponse)})
    const req = httpMock.expectOne(environment.ApiBase + 'authentication/token/new?api_key='+environment.ApiKey)
    expect(req.request.method).toBe("GET");
    req.flush(dummyResponse);
  })

  it('should create access token', () => {
    const dummyResponse = {
      "accessToken": "5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
      "refreshToken": "EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
    };
    service.createAccessToken().subscribe(data => {expect(data).toEqual(dummyResponse)})
    const req = httpMock.expectOne(environment.ApiBase4 + 'auth/access_token')
    expect(req.request.method).toBe("POST");
    req.flush(dummyResponse);
  })
  it('should create access token (error)', () => {
    const dummyResponse = {
      "accessToken": "5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
      "refreshToken": "EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
    };
    let errResponse: any;
    service.createAccessToken().subscribe({
      next: data => {
        expect(data).toEqual(dummyResponse);
      },
      error: err => {
        errResponse = err
      }
    })
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const req = httpMock.expectOne(environment.ApiBase4 + 'auth/access_token')
    req.flush(dummyResponse,mockErrorResponse);
    expect(errResponse.status).toEqual(400);
  })

  it('should get account details', () => {
    const dummyResponse = {
      "accessToken": "5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
      "refreshToken": "EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
    };
    let session_id = '1'
    service.getAccountDetails(session_id).subscribe(data => {expect(data).toEqual(dummyResponse)})
    const req = httpMock.expectOne(environment.ApiBase + 'account?api_key='+environment.ApiKey + '&session_id=' + session_id)
    expect(req.request.method).toBe("GET");
    req.flush(dummyResponse);
  })

  it('should create session', () => {
    const dummyResponse = {
      "accessToken": "5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
      "refreshToken": "EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
    };
    service.createSession('token').subscribe(data => {expect(data).toEqual(dummyResponse)})
    const req = httpMock.expectOne(environment.ApiBase + 'authentication/session/new?api_key='+environment.ApiKey)
    expect(req.request.method).toBe("POST");
    req.flush(dummyResponse);
  })
  it('should create session (error)', () => {
    const dummyResponse = {
      "accessToken": "5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
      "refreshToken": "EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
    };
    let errResponse: any;
    service.createSession('token').subscribe({
      next: data => {expect(data).toEqual(dummyResponse)},
      error: err => {
        errResponse = err
      }
    })
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const req = httpMock.expectOne(environment.ApiBase + 'authentication/session/new?api_key='+environment.ApiKey)
    req.flush(dummyResponse,mockErrorResponse);
    expect(errResponse.status).toEqual(400);
  })

  it('should create session with login and password', () => {
    const dummyResponse = {
      "accessToken": "5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
      "refreshToken": "EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
    };
    service.createSessionWithLoginAndPassword('token', 'second','token').subscribe(data => {expect(data).toEqual(dummyResponse)})
    const req = httpMock.expectOne(environment.ApiBase + 'authentication/token/validate_with_login?api_key='+environment.ApiKey)
    expect(req.request.method).toBe("POST");
    req.flush(dummyResponse);
  })

  it('should create session with login and password (error)', () => {
    const dummyResponse = {
      "accessToken": "5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
      "refreshToken": "EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
    };
    let errResponse: any;
    service.createSessionWithLoginAndPassword('token', 'second','token')
      .subscribe({
        next: data => {expect(data).toEqual(dummyResponse)},
        error: err => {
          errResponse = err
        }
      })
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const req = httpMock.expectOne(environment.ApiBase + 'authentication/token/validate_with_login?api_key='+environment.ApiKey)
    req.flush(dummyResponse,mockErrorResponse);
    expect(errResponse.status).toEqual(400);
  })
});
