import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { InputComponent } from './components/input/input.component';
import { NgxPaginationModule } from "ngx-pagination";
import { ResultsPlaceholderComponent } from './components/results-placeholder/results-placeholder.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {authInterceptorProviders} from "../core/interceptors/SnackbarInerceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    MovieCardComponent,
    InputComponent,
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
