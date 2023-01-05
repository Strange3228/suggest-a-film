import { Injectable } from '@angular/core';
import {ApiCommunicationService} from "./api-communication.service";
import {itemFromDbInterface, ListIds} from "../interfaces/api.interface";
import {BehaviorSubject, first, Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiDetailsService {

  search_results: Subject<{results: itemFromDbInterface[],total_results: number}> = new Subject<{results: itemFromDbInterface[],total_results: number}>()

  constructor(
    private apiCommunicationService: ApiCommunicationService,
    private router: Router
  ) { }

  getWatchedItemsIds():number[]{
    let watchedIds:number[] = []
    this.apiCommunicationService.getList(ListIds.watched).pipe(first()).subscribe({
      next: (data) => {
        data.items.map((e:{id: number}) => {
          watchedIds.push(e.id)
        })
      }
    })
    return watchedIds
  }

  getSuggestedItemsIds():number[]{
    let suggestedIds:number[] = []
    this.apiCommunicationService.getList(ListIds.suggested).pipe(first()).subscribe({
      next: (data) => {
        data.items.map((e:{id: number}) => {
          suggestedIds.push(e.id)
        })
      }
    })
    return suggestedIds
  }

  getSearchResults(
    media_type: 'movie' | 'tv',
    page: number,
    search_query: string,
    linkBase: string
  ):void {
    let results: itemFromDbInterface[] = []
    let total_results = 0
    this.apiCommunicationService.getSearchResult(media_type, page, search_query)
      .pipe(first())
      .subscribe({
        next: (data) => {
          results = data.results
          total_results = data.total_results
          this.router.navigate([linkBase + media_type + '/' + search_query + '/' + page])
          this.search_results.next({results: results,total_results: total_results})
        },
        error: (error) => {
          console.log(error)
        }
      })
  }
}
