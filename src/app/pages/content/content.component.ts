import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit{

  pageTitle: 'Movies' | 'TV Shows' | 'Suggest Me' = 'Movies';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        if(this.activatedRoute.snapshot.firstChild?.routeConfig?.path == 'movies') {
          this.pageTitle = 'Movies'
        } else if(this.activatedRoute.snapshot.firstChild?.routeConfig?.path == 'tv') {
          this.pageTitle = 'TV Shows'
        }
      }
    });
  }

  ngOnInit() {
    if(this.activatedRoute.snapshot.firstChild?.routeConfig?.path == 'movies') {
      this.pageTitle = 'Movies'
    } else if(this.activatedRoute.snapshot.firstChild?.routeConfig?.path == 'tv') {
      this.pageTitle = 'TV Shows'
    }
  }
}
