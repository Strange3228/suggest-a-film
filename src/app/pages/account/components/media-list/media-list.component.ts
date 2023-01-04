import { Component, OnInit } from '@angular/core';
import {ApiCommunicationService} from "../../../../shared/services/api-communication.service";
import {ListIds, ListItem} from "../../../../shared/interfaces/api.interface";
import {first} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

enum Lists {
  suggestions='suggestions',
  movies='movie',
  tv='tv'
}

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {
  isLoading: boolean = false

  list_name: string
  list_name_short: string
  list_id: number

  page:number = 1
  medias: ListItem[]

  constructor(
    private apiCommunicationService: ApiCommunicationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.list_name_short = this.activatedRoute.snapshot.params['list']
    switch (this.list_name_short){
      case Lists.suggestions:
        this.list_name = 'Suggestions';
        this.list_id = ListIds.suggested
        break;
      case Lists.tv:
        this.list_name = 'Tv Show';
        this.list_id = ListIds.watched
        break;
      case Lists.movies:
        this.list_name = "Movies"
        this.list_id = ListIds.watched
        break;
    }
  }

  ngOnInit(): void {
    this.isLoading = true
    this.apiCommunicationService.getList(this.list_id).pipe(first())
      .subscribe({
        next: data => {
          this.medias = data.items
          switch (this.list_name_short){
            case Lists.suggestions:
              this.medias = data.items
              break;
            case Lists.tv:
              this.medias = data.items.filter((item:ListItem) => item.media_type == 'tv')
              break;
            case Lists.movies:
              this.medias = data.items.filter((item:ListItem) => item.media_type == 'movie')
              break;
          }
          console.log(this.medias)
          this.isLoading = false
        },
        error: error => {
          console.log(error)
        }
      })
  }

  goToPage(event:any){
    this.page = event
    //this.router.navigate(['/content/movies/' + this.page])
  }
}
