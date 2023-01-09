import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageMonitoringService } from '../../shared/services/session-storage-monitoring.service';
import { TokenStorageService } from '../../shared/services/token-storage.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss'],
})
export class NavbarAdminComponent implements OnInit {
  subscription: any;
  openOnMobile: boolean = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private sessionStorageMonitoringService: SessionStorageMonitoringService
  ) {}

  ngOnInit(): void {}

  logout(event: Event): void {
    event.preventDefault();
    this.tokenStorageService.logout();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.sessionStorageMonitoringService
      .getAddUsuario()
      .subscribe((status) => {
        console.log('new value by login component -> ', status);
      });
    this.router.navigate(['/content/movies/1']);
  }

  openSideBar(): void {
    this.openOnMobile = !this.openOnMobile;
    // @ts-ignore
    document.querySelector('body').classList.toggle('block_scroll');
  }
}
