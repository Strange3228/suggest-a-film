import { Component, OnInit } from '@angular/core';
import {IconsRegisterService} from "./services/icons-register.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private iconsRegisterService: IconsRegisterService
  ) {
    this.iconsRegisterService.registerIcons()
  }

  ngOnInit() {
  }
}
