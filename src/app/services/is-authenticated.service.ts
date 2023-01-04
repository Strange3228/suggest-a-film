import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {TokenStorageService} from "../shared/services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedService implements CanActivate{

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.tokenStorageService.getLoginInfo() == 'true'){
      this.router.navigate(['account'])
    }
    return true
  }
}

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthenticatedService implements CanActivate{

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.tokenStorageService.getLoginInfo() == 'false' || !this.tokenStorageService.getLoginInfo()){
      this.router.navigate(['content'])
    }
    return true
  }
}
