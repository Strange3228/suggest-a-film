import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AddToListComponent } from "./components/add-to-list/add-to-list.component";
import { MediaListComponent } from "./components/media-list/media-list.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'list/:list',
    component: MediaListComponent
  },
  {
    path: 'list/:list/:page',
    component: MediaListComponent
  },
  {
    path: 'add',
    component: AddToListComponent
  },
  {
    path: 'add/:media_type/:search_query/:page',
    title: 'Add To Watched',
    component: AddToListComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
