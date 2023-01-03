import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {first, Subject, takeUntil} from "rxjs";
import {ApiCommunicationService} from "../../../../shared/services/api-communication.service";
import {itemFromDbInterface} from "../../../../shared/interfaces/api.interface";
import {ListIds} from "../../../../shared/interfaces/api.interface";

@Component({
  selector: 'app-suggest-me',
  templateUrl: './suggest-me.component.html',
  styleUrls: ['./suggest-me.component.scss']
})
export class SuggestMeComponent implements OnInit, OnDestroy {

  isDestroyed$: Subject<boolean> = new Subject<boolean>();

  searchForm : FormGroup
  searchResult: itemFromDbInterface[] = []
  page: number = 1
  media_type: 'movie' | 'tv' = 'movie'
  totalItems: number

  watchedIds: number[] = []
  suggestedIds: number[] = []

  openModal: boolean = false

  isLoading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private apiCommunicationService: ApiCommunicationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.updateData()
    this.getWatchedAndSuggestedIds()
    this.router.events.pipe(takeUntil(this.isDestroyed$)).subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.updateData()
      }
    });
  }

  updateData(){
    this.searchForm = this.formBuilder.group({
      search_query: this.activatedRoute.snapshot.paramMap.get('search_query')
    })
    if(
      parseInt(<string>this.activatedRoute.snapshot.paramMap.get('page')) > 0 &&
      this.activatedRoute.snapshot.paramMap.get('search_query') &&
      this.activatedRoute.snapshot.paramMap.get('media_type')
    ){
      let urlMediaType:string | null = this.activatedRoute.snapshot.paramMap.get('media_type')
      this.media_type = urlMediaType == 'movie' || urlMediaType == 'tv' ? urlMediaType : 'movie'
      this.page = parseInt(<string>this.activatedRoute.snapshot.paramMap.get('page'))
      this.router.navigate(['/content/suggest-me/' + this.media_type + '/' + this.activatedRoute.snapshot.paramMap.get('search_query') + '/' + this.page])
      this.searchForm = this.formBuilder.group({
        search_query: this.activatedRoute.snapshot.paramMap.get('search_query')
      })
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
    this.apiCommunicationService.getSearchResult(this.media_type,this.page,this.searchForm.value.search_query)
      .pipe(first())
      .subscribe({
        next: (data) => {
          console.log(data)
          this.searchResult = data.results
          this.totalItems = data.total_results
          this.router.navigate(['/content/suggest-me/' + this.media_type + '/' + this.searchForm.value.search_query + '/' + this.page])
          this.isLoading = false
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  goToPage(event:any){
    this.page = event
    this.getSearchResults()
    this.router.navigate(['/content/suggest-me/' + this.searchForm.value.search_query + '/' + this.page])
  }

  getWatchedAndSuggestedIds():void {
    this.apiCommunicationService.getList(ListIds.watched).pipe(first()).subscribe({
      next: (data) => {
        data.items.map((e:{id: number}) => {
          this.watchedIds.push(e.id)
        })
      }
    })
    this.apiCommunicationService.getList(ListIds.suggested).pipe(first()).subscribe({
      next: (data) => {
        data.items.map((e:{id: number}) => {
          this.suggestedIds.push(e.id)
        })
      }
    })
  }

  addToSuggestedIds(event: number): void {
    this.suggestedIds.push(event)
    console.log(this.suggestedIds)
    this.openModal = true
  }

  ngOnDestroy() {
    this.isDestroyed$.next(true)
    this.isDestroyed$.unsubscribe()
  }
}
