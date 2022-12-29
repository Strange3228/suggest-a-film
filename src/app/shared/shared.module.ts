import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import { InputComponent } from './components/input/input.component';
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
  declarations: [
    MovieCardComponent,
    InputComponent
  ],
  exports: [
    MovieCardComponent,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    NgxPaginationModule
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
