import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy{

  isDestroyed$: Subject<boolean> = new Subject<boolean>();

  pageTitle: 'Movies' | 'TV Shows' = 'Movies';
  mediaType: 'movie' | 'tv' = 'movie'
  searchForm: FormGroup

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    router.events.pipe(takeUntil(this.isDestroyed$)).subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.setMediaType()
      }
    });
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search_query: ''
    })
    this.setMediaType()
  }

  setMediaType(){
    let currentUrl = this.router.url
    if(currentUrl.includes('/movies/')) {
      this.pageTitle = 'Movies'
      this.mediaType = 'movie'
    } else if(currentUrl.includes('/tv/')) {
      this.pageTitle = 'TV Shows'
      this.mediaType = 'tv'
    }
  }

  search(){
    this.router.navigate(['/content/suggest-me/' + this.mediaType +'/'+this.searchForm.value.search_query+'/1'])
  }

  ngOnDestroy() {
    this.isDestroyed$.next(true)
    this.isDestroyed$.unsubscribe()
  }
}
