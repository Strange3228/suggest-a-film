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

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    /*if(
      this.activatedRoute.snapshot.queryParams['approved'] == 'true' &&
      this.tokenStorageService.getRequsetToken()
    ){
      this.authService.createAccessToken().pipe(first())
        .subscribe({
          next: (data) => {
            this.tokenStorageService.setAccessToken(data.access_token)
            this.router.navigate(['/account'])
          },
          error: (error) => {
            console.log(error)
          }
        })
    }*/
  }

  login():void{
    this.tokenStorageService.saveLoginInfo()
    this.router.navigate(['/account'])
  }

  /*loginToApplication(session_id: string):void {
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
          console.log(data)
          this.tokenStorageService.setRequestToken(data.request_token)
          window.open('https://www.themoviedb.org/auth/access?request_token=' + data.request_token, '_blank')
        },
        error: (error) => {
          console.log(error)
        }
      })
  }*/
}
