import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SessionStorageMonitoringService } from "./shared/services/session-storage-monitoring.service";

describe('AppComponent', () => {

  let sessionStorageMonitoringService: SessionStorageMonitoringService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    sessionStorageMonitoringService = TestBed.inject(SessionStorageMonitoringService)
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should update isLoggedStatus', () => {
    window.sessionStorage.setItem('addUsuario','false')
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.ngOnInit()
    //expect(component.userIsLogged).toEqual(false)
    //expect(component.userIsLoggedString).toEqual('false')
  })
});
