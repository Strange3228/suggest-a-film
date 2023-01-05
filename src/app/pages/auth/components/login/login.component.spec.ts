import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute, Router} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {of, Subject} from "rxjs";
import {TokenStorageService} from "../../../../shared/services/token-storage.service";
import {SessionStorageMonitoringService} from "../../../../shared/services/session-storage-monitoring.service";
import {AuthService} from "../../services/auth.service";
import {LoginComponent} from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: AuthService
  let tokenStorageService: TokenStorageService
  let sessionStorageMonitoringService: SessionStorageMonitoringService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: any) => {
                  if(key == 'media_type') return 'movie'
                  if(key == 'page') return 2
                  return 'search'
                }
              }
            }
          },
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService)
    router = TestBed.inject(Router)
    sessionStorageMonitoringService = TestBed.inject(SessionStorageMonitoringService)
    tokenStorageService = TestBed.inject(TokenStorageService)
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should change pass visibility', () => {
    component.passVisibility = false
    component.changePassVisibility()
    expect(component.passVisibility).toBeTruthy()
  })

  it('should call request login', () => {
    spyOn(component, 'requestLogin').and.stub()
    component.login()
    expect(component.requestLogin).toHaveBeenCalled()
  })

  it('should call create session', waitForAsync(() => {
    spyOn(component, 'createSession').and.stub()
    spyOn(authService, 'createRequestTokenV3').and.returnValue(of({
      request_token: 'token'
    }))
    component.requestLogin()
    expect(component.request_token).toEqual('token')
  }))

  it('should create session', () => {
    spyOn(router, 'navigate').and.stub()
    spyOn(sessionStorageMonitoringService, 'getAddUsuario').and.returnValue(of('true'))
    spyOn(authService, 'createSessionWithLoginAndPassword').and.returnValue(of(''))
    component.subscription = new Subject()
    spyOn(component.subscription, 'unsubscribe')
    component.createSession()
    expect(component.subscription).toBeTruthy()
  })
});
