import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  let service: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set logged status to true', () => {
    service.saveLoginInfo()
    expect(window.sessionStorage.getItem('user-logged')).toEqual('true')
  })

  it('should return logged status', () => {
    service.saveLoginInfo()
    expect(service.getLoginInfo()).toEqual('true')
  })

  it('should logout', () => {
    service.saveLoginInfo()
    expect(service.getLoginInfo()).toEqual('true')
    service.logout()
    expect(service.getLoginInfo()).toBeNull()
  })

  it('should save session id', () => {
    service.saveSession('123')
    expect(service.getSessionId()).toEqual('123')
  })

  it('should set request token', () => {
    service.setRequestToken('123')
    expect(service.getRequsetToken()).toEqual('123')
  })

  it('should set account id', () => {
    service.saveAccount('123')
    expect(service.getAccountId()).toEqual('123')
  })

  it('should set access token', () => {
    service.setAccessToken('123')
    expect(service.getAccessToken()).toEqual('123')
  })

  it('should return true if user is logged', () => {
    service.saveSession('123')
    service.saveAccount('123')
    expect(service.ifUserIsLogged()).toBeTruthy()
  })
});
