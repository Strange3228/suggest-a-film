import { Injectable, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UrlParamsService implements OnInit{

  media_type: 'movie' | 'tv'
  page = 1
  search_query: string = ''

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  updateValues(url_base: string):void{
    if(this.urlHasSearchParams()){
      let urlMediaType:string | null = this.activatedRoute.snapshot.paramMap.get('media_type')
      this.media_type = urlMediaType == 'movie' || urlMediaType == 'tv' ? urlMediaType : 'movie'
      this.page = parseInt(<string>this.activatedRoute.snapshot.paramMap.get('page'))
      this.router.navigate([url_base + this.media_type + '/' + this.activatedRoute.snapshot.paramMap.get('search_query') + '/' + this.page])
    }
  }

  urlHasSearchParams(): boolean{

    console.log(this.activatedRoute.snapshot.paramMap.get('search_query'))
    return !!(parseInt(<string>this.activatedRoute.snapshot.paramMap.get('page')) > 0 &&
      this.activatedRoute.snapshot.paramMap.get('search_query') &&
      this.activatedRoute.snapshot.paramMap.get('media_type')
    )
  }

  getMediaType(): 'movie' | 'tv' {
    return this.media_type
  }
  getPage():number{
    return this.page
  }
  getSearchQuery():string | null {
    return this.activatedRoute.snapshot.paramMap.get('search_query')
  }
}
