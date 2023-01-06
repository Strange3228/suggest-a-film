import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {itemFromDbInterface} from "../../../../shared/interfaces/api.interface";
import {ApiCommunicationService} from "../../../../shared/services/api-communication.service";

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {

  streamIsActive$: Subject<boolean> = new Subject<boolean>()
  tvShows: itemFromDbInterface[]
  totalShows: number = 0
  pageFromUrl: string | null = this.activatedRoute.snapshot.paramMap.get('page')
  page: number = 1

  isLoading: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiCommunicationService: ApiCommunicationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(parseInt(<string>this.pageFromUrl) > 0){
      this.page = parseInt(<string>this.pageFromUrl)
    }
    this.updateTvShows()
  }

  updateTvShows():void{
    this.isLoading = true
    this.apiCommunicationService.getPopularMovies('tv', this.page)
      .pipe(takeUntil(this.streamIsActive$))
      .subscribe({
        next: (data) => {
          console.log(data)
          this.tvShows = data.results
          this.totalShows = data.total_results
          this.isLoading = false
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  goToPage(event:any){
    this.page = event
    this.updateTvShows()
    this.router.navigate(['/content/tv/' + this.page])
  }
}
