import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {

  @Input() isActive: boolean = false

  @Output() close = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  closeModal():void{
    this.isActive = false
    this.close.emit(true)
  }
}
