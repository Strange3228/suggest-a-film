import { Component, OnInit, Input } from '@angular/core';
import { environment } from "../../../../environments/environment";
import {ApiCommunicationService} from "../../services/api-communication.service";
import {ListIds} from "../../interfaces/api.interface";
import {TokenStorageService} from "../../services/token-storage.service";
import {first} from "rxjs";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  ApiBaseImagePath: string = environment.ApiImage500Base
  @Input() media_id: number
  @Input() coverImageLink: string | undefined
  @Input() title: string | undefined
  @Input() rating: string | undefined

  @Input() alreadyWatched: boolean = false

  @Input() allowSuggestions: boolean = false

  constructor(
    private apiCommunicationService: ApiCommunicationService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
  }

  suggestFilm():void{
    this.apiCommunicationService.addItemToList(ListIds.suggested, this.tokenStorageService.getSessionId(), this.media_id).pipe(first())
      .subscribe({
        next: (data) => {
          console.log(data)
        }
      })
  }

}
