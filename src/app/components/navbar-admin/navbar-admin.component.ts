import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../shared/services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(event: Event): void{
    event.preventDefault()
    this.tokenStorageService.logout()
    this.router.navigate(['/content/movies/1'])
  }
}
