import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {ApiCommunicationService} from "../../../../shared/services/api-communication.service";
import {environment} from "../../../../../environments/environment";
import {itemFromDbInterface} from "../../../../shared/interfaces/api.interface";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  streamIsActive$: Subject<boolean> = new Subject<boolean>()
  ApiBaseImagePath: string = environment.ApiImageOriginalBase
  details: itemFromDbInterface

  mediaType: 'movie' | 'tv'

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiCommunicationService: ApiCommunicationService
  ) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        console.log(this.activatedRoute.snapshot)
        if(this.activatedRoute.snapshot.url[0].path == 'movie'){
          this.mediaType = 'movie'
        } else if(this.activatedRoute.snapshot.url[0].path == 'tv') {
          this.mediaType = 'tv'
        }
      }
    });
  }

  ngOnInit(): void {
   this.apiCommunicationService.getDetails(this.mediaType, this.activatedRoute.snapshot.paramMap.get('id'))
     .pipe(takeUntil(this.streamIsActive$))
     .subscribe({
       next: (data) => {
         console.log(data)
         this.details = data
       },
       error: (error) => {
         console.log(error)
       }
     })
  }

}
