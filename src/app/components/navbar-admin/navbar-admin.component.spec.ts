import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAdminComponent } from './navbar-admin.component';
import {TokenStorageService} from "../../shared/services/token-storage.service";
import {SessionStorageMonitoringService} from "../../shared/services/session-storage-monitoring.service";
import {of, Subject} from "rxjs";
import {Router} from "@angular/router";

describe('NavbarAdminComponent', () => {
  let component: NavbarAdminComponent;
  let fixture: ComponentFixture<NavbarAdminComponent>;
  let tokenStorageService: TokenStorageService
  let sessionStorageMonitoringService: SessionStorageMonitoringService
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarAdminComponent);
    component = fixture.componentInstance;
    tokenStorageService = TestBed.inject(TokenStorageService)
    sessionStorageMonitoringService = TestBed.inject(SessionStorageMonitoringService)
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    const click = new Event('click')
    tokenStorageService.saveLoginInfo()
    component.subscription = new Subject()
    spyOn(sessionStorageMonitoringService, 'getAddUsuario').and.returnValue(of('true'))
    spyOn(router, 'navigate').and.stub()
    component.logout(click)
    expect(tokenStorageService.ifUserIsLogged()).toBeFalsy()
  })
});
