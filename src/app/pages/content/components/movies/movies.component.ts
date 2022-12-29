import { Component, OnInit } from '@angular/core';
import {first, Subject, takeUntil} from "rxjs";
import { ApiCommunicationService } from "../../../../shared/services/api-communication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  streamIsActive$: Subject<boolean> = new Subject<boolean>()
  movies: any
  totalMovies: number = 0
  pageFromUrl: string | null = this.activatedRoute.snapshot.paramMap.get('page')
  page: number = 1

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiCommunicationService: ApiCommunicationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if(parseInt(<string>this.pageFromUrl) > 0){
      this.page = parseInt(<string>this.pageFromUrl)
    }
    this.updateMovies()
  }

  updateMovies(){
    this.apiCommunicationService.getPopularMovies('movie', this.page)
      .pipe(takeUntil(this.streamIsActive$))
      .subscribe({
        next: (data) => {
          console.log(data)
          this.movies = data.results
          this.totalMovies = data.total_results
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  goToPage(event:any){
    this.page = event
    this.updateMovies()
    this.router.navigate(['/content/movies/' + this.page])
  }
}
