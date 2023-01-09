import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-guest',
  templateUrl: './navbar-guest.component.html',
  styleUrls: ['./navbar-guest.component.scss']
})
export class NavbarGuestComponent implements OnInit {

  openOnMobile: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  openSideBar(): void{
    console.log('call')
    this.openOnMobile = !this.openOnMobile
    // @ts-ignore
    document.querySelector('body').classList.toggle('block_scroll')
  }
}
