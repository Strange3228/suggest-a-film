import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ApiCommunicationService} from "../../../../shared/services/api-communication.service";
import {ListIds, ListItem} from "../../../../shared/interfaces/api.interface";

export enum MediaTypes {
  all = "All",
  tv = "Tv",
  movie = "Movie"
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  watchList: ListItem[]
  watchListFiltered: ListItem[]
  page: number = 1
  selectedMediaType: MediaTypes.all | MediaTypes.tv | MediaTypes.movie = MediaTypes.all

  MediaTypes: typeof MediaTypes = MediaTypes

  isLoading: boolean = false

  streamIsActive$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private apiCommunicationService: ApiCommunicationService
  ) { }

  ngOnInit(): void {
    this.updateWatchList()
  }

  updateWatchList(){
    this.isLoading = true
    this.apiCommunicationService.getList(ListIds.watched)
      .pipe(takeUntil(this.streamIsActive$))
      .subscribe({
        next: data => {
          this.watchList = data.items
          this.watchListFiltered = data.items
          this.isLoading = false
        },
        error: error => {
          console.log(error)
        }
      })
  }

  changeCategory(media_type: MediaTypes.all | MediaTypes.tv | MediaTypes.movie):void{
    this.selectedMediaType = media_type
    if(this.selectedMediaType == MediaTypes.all){
      this.watchListFiltered = this.watchList
    } else if(this.selectedMediaType == MediaTypes.movie){
      this.watchListFiltered = this.watchList.filter((item: ListItem) => item.media_type == 'movie')
    } else {
      this.watchListFiltered = this.watchList.filter((item: ListItem) => item.media_type == 'tv')
    }
  }

  goToPage(event:any){
    this.page = event
    //this.router.navigate(['/content/movies/' + this.page])
  }

  ngOnDestroy() {
    this.streamIsActive$.next(true)
    this.streamIsActive$.unsubscribe()
  }
}
