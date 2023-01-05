import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, } from 'rxjs/operators';
import {SnackbarService} from "../../shared/services/snackbar.service";

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {

  constructor(private snackBarService: SnackbarService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(e => {
        if (request.method == "POST" || request.method == "PUT")
          if (e instanceof HttpResponse && e.status == 200) {
            this.snackBarService.showSuccess()
          }
      }),
      catchError(error => {
        this.snackBarService.showError(error.error.status_message)
        return throwError(error);
      })
    );
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: SnackbarInterceptor, multi: true}
]
