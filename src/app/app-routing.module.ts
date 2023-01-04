import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from "./components/not-found/not-found.component";
import {IsAuthenticatedService, IsNotAuthenticatedService} from "./services/is-authenticated.service";

const routes: Routes = [
  {
    path: 'content',
    loadChildren: () => import('./pages/content/content.module')
      .then(m => m.ContentModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module')
      .then(m => m.AuthModule),
    canActivate: [IsAuthenticatedService]
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module')
      .then(m => m.AccountModule),
    canActivate: [IsNotAuthenticatedService]
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
