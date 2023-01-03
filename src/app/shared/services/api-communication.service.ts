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

  getSearchResult(media_type: 'movie' | 'tv', page: number, query: string):Observable<any>{
    return this.httpClient.get(environment.ApiBase + 'search/' + media_type + '/' + '?api_key=' + environment.ApiKey + '&language=en-US&query=' + query + '&page=' + page + '&include_adult=false')
      .pipe(catchError(err => {throw err}))
  }

  getWatchlist(media_type: 'movie' | 'tv', page: number, account_id: string | null, session_id: string| null):Observable<any>{
    return this.httpClient.get(environment.ApiBase + 'account/' + account_id +'/watchlist/movies?api_key=' + environment.ApiKey +'&language=en-US&session_id=' + session_id + '&sort_by=created_at.asc&page=' + page)
  }

  getList(list_id: number):Observable<any>{
    return this.httpClient.get(environment.ApiBase + 'list/' + list_id + '?api_key=' + environment.ApiKey + '&language=en-US')
  }

  addItemToList(list_id: number, session_id: string | null, media_id: number):Observable<any>{
    return this.httpClient.post(environment.ApiBase + 'list/' + list_id + '/add_item?api_key=' + environment.ApiKey + '&session_id=' + session_id, {
      "media_id": media_id
    })
  }
}
