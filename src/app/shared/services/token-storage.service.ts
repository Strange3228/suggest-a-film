import { Injectable } from '@angular/core';

const SESSION_ID = 'session-id'
const ACCOUNT_ID = 'account-id'
const REQUEST_TOKEN = 'request-token'
const ACCESS_TOKEN = 'access-token'
const USER_LOGGED = 'user-logged'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  saveLoginInfo():void{
    window.sessionStorage.setItem(USER_LOGGED, 'true')
  }
  getLoginInfo():string | null {
    return sessionStorage.getItem(USER_LOGGED)
  }
  logout():void{
    window.sessionStorage.clear()
  }

  saveSession(sessionId: string){
    window.sessionStorage.setItem(SESSION_ID, sessionId)
  }

  saveAccount(accountId: string){
    window.sessionStorage.setItem(ACCOUNT_ID, accountId)
  }

  getAccountId():string | null{
    return sessionStorage.getItem(ACCOUNT_ID)
  }

  getSessionId(): string | null {
    return  sessionStorage.getItem(SESSION_ID)
  }

  getRequsetToken():string | null {
    return sessionStorage.getItem(REQUEST_TOKEN)
  }
  setRequestToken(token: string):void{
    window.sessionStorage.setItem(REQUEST_TOKEN, token)
  }

  getAccessToken():string | null {
    return sessionStorage.getItem(ACCESS_TOKEN)
  }
  setAccessToken(token: string):void{
    window.sessionStorage.setItem(ACCESS_TOKEN, token)
  }

  ifUserIsLogged(): boolean {
    return !!(sessionStorage.getItem(SESSION_ID) && sessionStorage.getItem(ACCOUNT_ID));
  }
}
