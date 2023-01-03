import { Injectable } from '@angular/core';

const SESSION_ID = 'session-id'
const ACCOUNT_ID = 'account-id'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

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

  ifUserIsLogged(): boolean {
    return !!(sessionStorage.getItem(SESSION_ID) && sessionStorage.getItem(ACCOUNT_ID));
  }
}
