import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiCommunicationService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPopularMovies(media_type: 'movie' | 'tv', page: number):Observable<any>{
    return this.httpClient.get(environment.ApiBase + media_type +'/popular?api_key=' + environment.ApiKey + '&language=en-US&page=' + page)
      .pipe(catchError(err => {throw err}))
  }

  getDetails(media_type: 'movie' | 'tv', itemId: string | null):Observable<any>{
    return this.httpClient.get(environment.ApiBase + media_type +'/' + itemId + '?api_key=' + environment.ApiKey + '&language=en-US')
      .pipe(catchError(err => {throw err}))
  }
}
