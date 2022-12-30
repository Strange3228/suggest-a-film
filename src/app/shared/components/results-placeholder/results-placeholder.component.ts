import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results-placeholder',
  templateUrl: './results-placeholder.component.html',
  styleUrls: ['./results-placeholder.component.scss']
})
export class ResultsPlaceholderComponent implements OnInit {

  placeholderCount: number[]

  constructor() {
    this.placeholderCount = Array(20).fill(0).map((x, i) => i)
  }

  ngOnInit(): void {
  }

}
