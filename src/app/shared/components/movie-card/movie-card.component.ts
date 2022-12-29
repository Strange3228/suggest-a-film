import { Component, OnInit, Input } from '@angular/core';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  ApiBaseImagePath: string = environment.ApiImage500Base
  @Input() coverImageLink: string | undefined
  @Input() title: string | undefined
  @Input() rating: string | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
