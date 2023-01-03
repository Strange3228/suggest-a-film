import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {

  @Input() isActive: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  closeModal():void{
    this.isActive = false
  }
}
