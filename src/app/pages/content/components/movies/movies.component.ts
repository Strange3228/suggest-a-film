import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiCommunicationService } from '../../../../shared/services/api-communication.service';
import { itemFromDbInterface } from '../../../../shared/interfaces/api.interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  streamIsActive$: Subject<boolean> = new Subject<boolean>();
  movies: itemFromDbInterface[];
  totalMovies: number = 0;
  pageFromUrl: string | null =
    this.activatedRoute.snapshot.paramMap.get('page');
  page: number = 1;

  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiCommunicationService: ApiCommunicationService,
    private router: Router
  ) {}

  ngOnInit() {
    if (parseInt(<string>this.pageFromUrl) > 0) {
      this.page = parseInt(<string>this.pageFromUrl);
    }
    this.updateMovies();
  }

  updateMovies() {
    this.isLoading = true;
    this.apiCommunicationService
      .getPopularMovies('movie', this.page)
      .pipe(takeUntil(this.streamIsActive$))
      .subscribe({
        next: (data) => {
          this.movies = data.results;
          this.totalMovies = data.total_results;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  goToPage(event: any) {
    this.page = event;
    this.updateMovies();
    this.router.navigate(['/content/movies/' + this.page]);
  }
}
