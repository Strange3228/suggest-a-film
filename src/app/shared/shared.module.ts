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

@NgModule({
  declarations: [
    MovieCardComponent,
    InputComponent,
    ResultsPlaceholderComponent
  ],
  exports: [
    MovieCardComponent,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    NgxPaginationModule,
    ResultsPlaceholderComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    RouterModule
  ]
})
export class SharedModule { }
