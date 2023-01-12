import { Component, OnInit } from '@angular/core';
import {ActiveElement, Chart, ChartEvent} from "chart.js/auto";
import {ListItem} from "../../../../shared/interfaces/api.interface";
import {ApiCommunicationService} from "../../../../shared/services/api-communication.service";
import {first} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {scrollDown, scrollUp} from "../../../../shared/animations/animations";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  animations: [scrollDown, scrollUp]
})
export class ChartsComponent implements OnInit {
  ApiBaseImagePath: string = environment.ApiImage500Base

  chart: any
  trendingMovies: ListItem[] = []
  trendingTv: ListItem[] = []

  activeMediasArray: ListItem[] = []
  activeMediaType: 'movie' | 'tv'
  openMedias: boolean = false

  constructor(
    private apiCommunicationService: ApiCommunicationService
  ) {
  }

  ngOnInit(): void {
    this.apiCommunicationService.getPopular('week').pipe(first()).subscribe({
      next: data => {
        data.results.map((item:ListItem) => {
          if(item.media_type == 'movie'){
            this.trendingMovies.push(item)
          } else {
            this.trendingTv.push(item)
          }
        })
        this.createChart()
      },
      error: err => console.log(err)
    })
  }

  showMedia(media_type: 'movie' | 'tv'){
    this.activeMediaType = media_type
    this.activeMediasArray = media_type == 'movie' ? this.trendingMovies : this.trendingTv
    if(this.openMedias){
      this.openMedias = false
      setTimeout(() => {
        this.openMedias = true
      }, 1000)
    } else {
      this.openMedias = true
    }
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        datasets: [
          {
            data: [{x: 'Movies', y: this.trendingMovies.length}, {x: 'Tv Shows', y: this.trendingTv.length}],
            backgroundColor: '#1884ca'
          }
        ]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          legend: {
            display: false
          }
        },
        onClick: (event: ChartEvent, elements: ActiveElement[], chart: Chart) => {
          if(elements[0].index == 0){
            this.showMedia('movie')
          } else {
            this.showMedia('tv')
          }
        }
      }
    });
  }
}
