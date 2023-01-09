import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ApiCommunicationService {

  constructor(
    private httpClient: HttpClient,
    private tokenStorageService: TokenStorageService
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
    return this.httpClient.get(environment.ApiBase4 + 'search/' + media_type + '/' + '?api_key=' + environment.ApiKey + '&language=en-US&query=' + query + '&page=' + page + '&include_adult=false', {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
      .pipe(catchError(err => {throw err}))
  }

  getList(list_id: number):Observable<any>{
    return this.httpClient.get(environment.ApiBase + 'list/' + list_id + '?api_key=' + environment.ApiKey + '&language=en-US')
  }

  addItemToList(list_id: number, media_type: string, media_id: number):Observable<any>{
    return this.httpClient.post(environment.ApiBase4 + 'list/' + list_id + '/items', {
      "items" : [
        {
          "media_type": media_type,
          "media_id": media_id
        }
      ]
    }, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${environment.ApiAccessToken}`
      })
    })
  }

  removeListItem(list_id: number, media_type: string, media_id: number):Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${environment.ApiAccessToken}`
      }),
      body: {
        "items" : [
          {
            "media_type": media_type,
            "media_id": media_id
          }
        ]
      }
    }
    return this.httpClient.delete(environment.ApiBase4 + 'list/' + list_id + '/items', options)
  }
}
