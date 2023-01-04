import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "../../../../shared/services/token-storage.service";
import { ApiCommunicationService } from "../../../../shared/services/api-communication.service";
import {first, Subject, takeUntil} from "rxjs";
import {ListIds, ListItem} from "../../../../shared/interfaces/api.interface";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  movieCount: number = 0;
  tvCount: number = 0

  suggestionsCount: number = 0

  constructor(
    private tokenStorageService: TokenStorageService,
    private apiCommunicationService: ApiCommunicationService
  ) { }

  ngOnInit(): void {
    this.apiCommunicationService.getList(ListIds.watched).pipe(first()).subscribe({
      next: (data) => {
        data.items.map((item: ListItem) => {
          if(item.media_type == 'movie'){
            this.movieCount++
          } else {
            this.tvCount++
          }
        })
      }
    })
    this.apiCommunicationService.getList(ListIds.suggested).pipe(first()).subscribe({
      next: (data) => {
        this.suggestionsCount = data.items.length
      }
    })
  }

}
