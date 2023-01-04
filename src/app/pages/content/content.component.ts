import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";

enum Titles {
  movies="Movies",
  tv="Tv Shows",
  main="Hello Stranger!"
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy{

  isDestroyed$: Subject<boolean> = new Subject<boolean>();

  pageTitle: Titles.movies | Titles.tv | Titles.main = Titles.movies;
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
      this.pageTitle = Titles.movies
      this.mediaType = 'movie'
    } else if(currentUrl.includes('/tv/')) {
      this.pageTitle = Titles.tv
      this.mediaType = 'tv'
    } else {
      this.pageTitle = Titles.main
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
