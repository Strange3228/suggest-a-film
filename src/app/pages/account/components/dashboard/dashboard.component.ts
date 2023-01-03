import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "../../../../shared/services/token-storage.service";
import { ApiCommunicationService } from "../../../../shared/services/api-communication.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isDestroyed$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private tokenStorageService: TokenStorageService,
    private apiCommunicationService: ApiCommunicationService
  ) { }

  ngOnInit(): void {
    /*this.apiCommunicationService.getWatchlist(
      'movie',
      1,
      this.tokenStorageService.getAccountId(),
      this.tokenStorageService.getSessionId()
    )
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe({
        next: (data) => {
          console.log(data)
        },
        error: (error) => {
          console.log(error)
        }
      })*/
  }

}
