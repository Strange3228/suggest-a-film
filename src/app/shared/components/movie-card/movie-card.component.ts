import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {first} from "rxjs";
import {environment} from "../../../../environments/environment";
import {ApiCommunicationService} from "../../services/api-communication.service";
import {ListIds} from "../../interfaces/api.interface";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  ApiBaseImagePath: string = environment.ApiImage300Base
  addedToMyList:boolean = false

  @Input() media_id: number
  @Input() media_type: string
  @Input() coverImageLink: string | undefined
  @Input() title: string | undefined
  @Input() rating: string | undefined

  @Input() alreadyWatched: boolean = false
  @Input() alreadySuggested: boolean = false

  @Input() allowSuggestions: boolean = false
  @Input() adminView: boolean = false

  @Output() addToSuggested = new EventEmitter<number>()
  @Output() addToWatched = new EventEmitter<number>()

  constructor(
    private apiCommunicationService: ApiCommunicationService,
  ) { }

  ngOnInit(): void {
  }

  suggestFilm():void{
    this.apiCommunicationService.addItemToList(ListIds.suggested,this.media_type, this.media_id).pipe(first())
      .subscribe({
        next: (data) => {
          if(data.success == true){
            this.alreadySuggested = true
            this.addToSuggested.emit(this.media_id)
          }
        }
      })
  }

  addToWatchlist(event: Event):void{
    event.preventDefault()
    this.apiCommunicationService.addItemToList(ListIds.watched,this.media_type,this.media_id).pipe(first())
      .subscribe({
        next: (data) => {
          if(data.success == true){
            this.addToWatched.emit(this.media_id)
          }
        }
      })
    this.apiCommunicationService.removeListItem(ListIds.suggested,this.media_type,this.media_id).pipe(first())
      .subscribe({
        next: (data) => {
          if(data.success == true){
            this.addedToMyList = true;
          }
        }
      })
  }

}
