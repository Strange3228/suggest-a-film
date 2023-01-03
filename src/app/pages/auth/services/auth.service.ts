import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  createRequestToken():Observable<any>{
    return this.httpClient.get(environment.ApiBase + 'authentication/token/new?api_key=' + environment.ApiKey)
      .pipe(catchError(err => {throw err}))
  }

  getAccountDetails(session_id: string):Observable<any>{
    return this.httpClient.get(environment.ApiBase + 'account?api_key=' + environment.ApiKey + '&session_id=' + session_id)
  }

  createSession(requestToken: string):Observable<any>{
    return this.httpClient.post(environment.ApiBase + 'authentication/session/new?api_key=' + environment.ApiKey,
      {
        "request_token": requestToken
      })
      .pipe(catchError(err => {throw err}))
  }
}
