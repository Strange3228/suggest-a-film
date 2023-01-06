import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NavigationEnd, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {ApiCommunicationService} from "../../../../shared/services/api-communication.service";
import {itemFromDbInterface} from "../../../../shared/interfaces/api.interface";
import {ApiDetailsService} from "../../../../shared/services/api-details.service";
import {UrlParamsService} from "../../../../shared/services/url-params.service";

@Component({
  selector: 'app-suggest-me',
  templateUrl: './suggest-me.component.html',
  styleUrls: ['./suggest-me.component.scss'],
  providers: [UrlParamsService]
})
export class SuggestMeComponent implements OnInit, OnDestroy {

  isDestroyed$: Subject<boolean> = new Subject<boolean>();
  isLoading: boolean = false

  searchForm : FormGroup
  searchResult: itemFromDbInterface[] = []
  page: number = 1
  media_type: 'movie' | 'tv' = 'movie'
  totalItems: number

  watchedIds: number[] = []
  suggestedIds: number[] = []

  openModal: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private apiCommunicationService: ApiCommunicationService,
    private apiDetailsService: ApiDetailsService,
    private router: Router,
    private urlParamsService: UrlParamsService
  ) {
  }

  ngOnInit(): void {
    this.updateData()
    this.suggestedIds = this.apiDetailsService.getSuggestedItemsIds()
    this.watchedIds = this.apiDetailsService.getWatchedItemsIds()
    this.apiDetailsService.search_results.pipe(takeUntil(this.isDestroyed$)).subscribe({
      next: data => {
        this.searchResult = data.results
        this.totalItems = data.total_results
        this.isLoading = false
      }
    })
    this.router.events.pipe(takeUntil(this.isDestroyed$)).subscribe((val) => {
      if(val instanceof NavigationEnd) this.updateData()
    });
  }

  updateData(){
    this.urlParamsService.updateValues('/content/suggest-me/')
    this.searchForm = this.formBuilder.group({
      search_query: this.urlParamsService.getSearchQuery()
    })
    if(this.urlParamsService.urlHasSearchParams()){
      this.media_type = this.urlParamsService.getMediaType()
      this.page = this.urlParamsService.getPage()
      this.getSearchResults()
    }
  }

  submitSearchForm(){
    this.page = 1;
    this.getSearchResults()
  }

  changeCategory(media_type: 'movie' | 'tv'){
    this.page = 1;
    this.media_type = media_type
    this.getSearchResults()
  }

  getSearchResults(){
    this.isLoading = true
    this.apiDetailsService.getSearchResults(this.media_type, this.page, this.searchForm.value.search_query, '/content/suggest-me/')
  }

  goToPage(event:any){
    this.page = event
    this.getSearchResults()
  }

  addToSuggestedIds(event: number): void {
    this.suggestedIds.push(event)
    this.openModal = true
  }

  closeModal(event: boolean):void {
    this.openModal = false
  }

  ngOnDestroy() {
    this.isDestroyed$.next(true)
    this.isDestroyed$.unsubscribe()
  }
}
