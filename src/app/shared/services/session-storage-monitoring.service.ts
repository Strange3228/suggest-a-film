import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageMonitoringService {
  private addUsuarioSource = new BehaviorSubject<string>(window.sessionStorage.getItem('user-logged') == 'true' ? 'true' : 'false');
  public addUsuario$ = this.addUsuarioSource.asObservable();

  constructor() {
    this.addUsuario$.subscribe(status => window.sessionStorage.setItem('addUsuario', status));
  }

  getAddUsuario(): Observable<string> {
    let userStatus = window.sessionStorage.getItem('addUsuario');
    userStatus = (userStatus === 'false' || userStatus == null) ? 'true' : 'false';
    this.addUsuarioSource.next(userStatus);
    return this.addUsuario$;
  }
}
