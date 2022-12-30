import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MoviesComponent } from "./components/movies/movies.component";
import { ContentComponent } from "./content.component";
import {TvShowsComponent} from "./components/tv-shows/tv-shows.component";
import {DetailsComponent} from "./components/details/details.component";
import {SuggestMeComponent} from "./components/suggest-me/suggest-me.component";

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'movies/:page',
        title: 'Movies',
        component: MoviesComponent
      },
      {
        path: 'tv/:page',
        title: 'Tv Shows',
        component: TvShowsComponent
      }
    ]
  },
  {
    path: 'suggest-me',
    title: 'Suggest Me',
    component: SuggestMeComponent
  },
  {
    path: 'suggest-me/:media_type/:search_query/:page',
    title: 'Suggest Me',
    component: SuggestMeComponent
  },
  {
    path: 'movie/details/:id',
    title: 'Movie Details',
    component: DetailsComponent
  },
  {
    path: 'tv/details/:id',
    title: 'Tv Show Details',
    component: DetailsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
