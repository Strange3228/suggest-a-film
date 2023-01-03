import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { MoviesComponent } from './components/movies/movies.component';
import { ContentRoutingModule } from "./content-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { ContentComponent } from "./content.component";
import { TvShowsComponent } from './components/tv-shows/tv-shows.component';
import { DetailsComponent } from './components/details/details.component';
import { SuggestMeComponent } from './components/suggest-me/suggest-me.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';



@NgModule({
  declarations: [
    MoviesComponent,
    ContentComponent,
    TvShowsComponent,
    DetailsComponent,
    SuggestMeComponent,
    ThankYouComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  bootstrap: [ContentComponent]
})
export class ContentModule { }
