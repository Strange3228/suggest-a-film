import {Router} from "@angular/router";
import {IsAuthenticatedService, IsNotAuthenticatedService} from './is-authenticated.service';
import {TokenStorageService} from "../shared/services/token-storage.service";

describe('IsAuthenticatedService', () => {
  let isAuthenticatedService: IsAuthenticatedService;
  let isNotAuthenticatedService: IsNotAuthenticatedService
  let tokenStorageService: TokenStorageService
  let router: Router

  beforeEach(() => {
    tokenStorageService = new TokenStorageService()
    router = jasmine.createSpyObj('Router',['navigate'])
    isNotAuthenticatedService = new IsNotAuthenticatedService(tokenStorageService, router)
    isAuthenticatedService = new IsAuthenticatedService(tokenStorageService, router)
  });

  it('should be created', () => {
    expect(isAuthenticatedService).toBeTruthy();
  });

  it('should return true if token is set', () => {
    tokenStorageService.saveAccount('123')
    tokenStorageService.saveLoginInfo()
    // @ts-ignore
    expect(isNotAuthenticatedService.canActivate('/dashboard', '')).toBe(true)
  })
  it('should navigate to the content page when the token storage service does not have a valid token', () => {
    tokenStorageService.logout();
    // @ts-ignore
    isNotAuthenticatedService.canActivate('account', '');
    expect(router.navigate).toHaveBeenCalledWith(['content']);
  });

  it('should return true if token is set', () => {
    tokenStorageService.saveAccount('123')
    tokenStorageService.saveLoginInfo()
    // @ts-ignore
    expect(isAuthenticatedService.canActivate('/dashboard', '')).toBe(true)
  })
  it('should redirect if is authenticated', () => {
    tokenStorageService.saveAccount('123')
    tokenStorageService.saveLoginInfo()
    // @ts-ignore
    isAuthenticatedService.canActivate('login', '');
    expect(router.navigate).toHaveBeenCalledWith(['account']);
  });
});
