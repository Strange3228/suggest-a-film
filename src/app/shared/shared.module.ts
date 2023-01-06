import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgxPaginationModule } from "ngx-pagination";
import { ResultsPlaceholderComponent } from './components/results-placeholder/results-placeholder.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { authInterceptorProviders } from "../core/interceptors/SnackbarInerceptor";
import { MovieCardComponent } from './components/movie-card/movie-card.component';

@NgModule({
  declarations: [
    MovieCardComponent,
    ResultsPlaceholderComponent,
    SpinnerComponent
  ],
  exports: [
    MovieCardComponent,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    NgxPaginationModule,
    ResultsPlaceholderComponent,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    RouterModule,
    MatSnackBarModule
  ],
  providers: [
    authInterceptorProviders
  ]
})
export class SharedModule { }
