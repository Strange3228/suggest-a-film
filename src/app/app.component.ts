import { Component, OnInit } from '@angular/core';
import {filter, fromEvent, map, Observable, Subject, take} from "rxjs";
import {IconsRegisterService} from "./services/icons-register.service";
import {TokenStorageService} from "./shared/services/token-storage.service";
import {SessionStorageMonitoringService} from "./shared/services/session-storage-monitoring.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  userIsLogged: boolean
  userIsLoggedString: string

  subscription: any

  constructor(
    private iconsRegisterService: IconsRegisterService,
    private tokenStorageService: TokenStorageService,
    private sessionStorageMonitoring: SessionStorageMonitoringService
  ) {
    this.iconsRegisterService.registerIcons()
  }

  ngOnInit() {
    this.sessionStorageMonitoring.addUsuario$.subscribe(
      status => {
        this.userIsLoggedString = status;
        this.userIsLogged = status == 'true';
      }
    )
  }
}
