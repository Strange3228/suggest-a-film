import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {first} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../../shared/services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  requestToken: string | undefined

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(
      this.activatedRoute.snapshot.queryParams['approved'] == 'true' &&
      this.activatedRoute.snapshot.queryParams['request_token'].length > 0 &&
      !this.tokenStorageService.ifUserIsLogged()
    ){
      this.authService.createSession(this.activatedRoute.snapshot.queryParams['request_token'])
        .pipe(first())
        .subscribe({
          next: (data) => {
            console.log(data)
            this.loginToApplication(data.session_id)
          },
          error: (error) => {
            console.log(error)
          }
        })
    }
  }

  loginToApplication(session_id: string):void {
    this.tokenStorageService.saveSession(session_id)
    this.authService.getAccountDetails(session_id)
      .pipe(first())
      .subscribe({
        next: (data) => {
          console.log(data)
          this.tokenStorageService.saveAccount(data.id)
          this.router.navigate(['/account'])
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  requestLogin(event: Event):void{
    event.preventDefault()
    this.authService.createRequestToken()
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.requestToken = data.request_token
          window.open('https://www.themoviedb.org/authenticate/' + this.requestToken + '?redirect_to=http://localhost:4200/login', '_blank')
        },
        error: (error) => {
          console.log(error)
        }
      })
  }
}
