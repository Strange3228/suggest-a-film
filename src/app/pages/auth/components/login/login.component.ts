import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {first} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../../shared/services/token-storage.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SessionStorageMonitoringService} from "../../../../shared/services/session-storage-monitoring.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  request_token: string
  subscription: any

  passVisibility: boolean = false

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sessionStorageMonitoringService: SessionStorageMonitoringService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: '',
      password: ''
    })
    if(this.tokenStorageService.getLoginInfo() == 'true'){

    }
  }

  login():void{
    this.requestLogin()
  }

  requestLogin():void{
    this.authService.createRequestTokenV3()
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.request_token = data.request_token
          this.createSession()
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  createSession():void{
    this.authService.createSessionWithLoginAndPassword(
      this.loginForm.value.login,
      this.loginForm.value.password,
      this.request_token
    ).pipe(first()).subscribe({
      next: () => {
        this.tokenStorageService.saveLoginInfo()
        if(this.subscription) {
          this.subscription.unsubscribe();
        }
        this.subscription = this.sessionStorageMonitoringService.getAddUsuario().subscribe(
          status => {console.log('new value by login component -> ', status)}
        )
        this.router.navigate(['/account'])
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  changePassVisibility() {
    this.passVisibility = !this.passVisibility
  }
}
