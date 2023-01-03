import { Component, OnInit } from '@angular/core';
import {IconsRegisterService} from "./services/icons-register.service";
import {Observable} from "rxjs";
import {TokenStorageService} from "./shared/services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  userIsLogged: boolean

  constructor(
    private iconsRegisterService: IconsRegisterService,
    private tokenStorageService: TokenStorageService
  ) {
    this.iconsRegisterService.registerIcons()
  }

  ngOnInit() {
    this.userIsLogged = this.tokenStorageService.getLoginInfo() == 'true';
  }
}
